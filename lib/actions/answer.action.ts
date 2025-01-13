"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";
import User from "@/database/user.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, author, questionId, path } = params;

    // console.log(questionId);

    const newAnswer = await Answer.create({
      content,
      author,
      questionId,
    });

    const questionObject = await Question.findByIdAndUpdate(questionId, {
      $push: {
        answers: newAnswer._id,
      },
    });

    await Interaction.create({
      user: author,
      action: "answer",
      question: questionId,
      tags: questionObject.tags,
    });

    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers({
  questionId,
  filter,
  page = 1,
  pageSize = 10,
}: GetAnswersParams) {
  try {
    connectToDatabase();

    const skipAmount = (page - 1) * pageSize;
    let sortOptions = {};
    switch (filter) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
    }

    const answers = await Answer.find({ questionId })
      .populate("author", "_id clerkId name picture")
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalAnswers = await Answer.countDocuments({ questionId });
    const isNext = totalAnswers > skipAmount + answers.length;

    return { answers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateQuery = {};

    if (hasUpvoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownvoted) {
      updateQuery = {
        $pull: {
          downvotes: userId,
        },
        $push: {
          upvotes: userId,
        },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    // console.log("Question: ", question);

    if (!answer) {
      throw new Error("Upvote answer not found!");
    }

    // Increament author reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasUpvoted ? -2 : 2 },
    });
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasUpvoted ? -10 : 10 },
    });
 
    revalidatePath(path);
    // return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasUpvoted, hasDownvoted, path } = params;

    let updateQuery = {};

    if (hasDownvoted) {
      updateQuery = {
        $pull: {
          downvotes: userId,
        },
      };
    } else if (hasUpvoted) {
      updateQuery = {
        $pull: {
          upvotes: userId,
        },
        $push: {
          downvotes: userId,
        },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Downvote answer not found!");
    }

    // Decreament author reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownvoted ? 1 : -1 },
    });
    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasDownvoted ? 10 : -10 },
    });

    revalidatePath(path);
    // return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();

    const { answerId, path } = params;
    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found!");
    }

    await Answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { _id: answer.questionId },
      { $pull: { answers: answerId } }
    );
    // await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
