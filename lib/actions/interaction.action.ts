"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";
import { revalidatePath } from "next/cache";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();
    console.log("params: ", params)
    const { questionId, userId } = params;

    if (userId) {
      const existingInteractions = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteractions) {
        console.log("User have already viewd this question!");
        return;
      }

      await Question.findByIdAndUpdate(questionId, {
        $inc: {
          views: 1,
        },
      });

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });

      revalidatePath("/")
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
