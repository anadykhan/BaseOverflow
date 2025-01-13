"use server"

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";
import Answer from "@/database/answer.model";

const SearchableTypes = ["question", "answer", "user", "tag"];

export async function globalSearch(params: SearchParams) {
    try {
        await connectToDatabase();
        
        const {query, type} = params;
        const regexQuery = {$regex: query, $options: "i"}

        let results = [];
        const typeLower = type?.toLowerCase();
        const modelsAndTypes = [
          {
            model: Question,
            searchField: "title",
            types: "question",
          },
          {
            model: Answer,
            searchField: "content",
            types: "answer",
          },
          {
            model: User,
            searchField: "name",
            types: "user",
          },
          {
            model: Tag,
            searchField: "name",
            types: "tag",
          },
        ];

        if(!typeLower || !SearchableTypes.includes(typeLower)) {
            for(const {model, searchField, types} of modelsAndTypes) {
                const queryResults = await model
                .find({[searchField]: regexQuery})
                .limit(2);

                results.push(
                  ...queryResults.map((item) => ({
                    title:
                      types === "answer"
                        ? `Answer containing ${query}`
                        : `${item[searchField]}`,
                    types,
                    id:
                      types === "user"
                        ? item.clerkId
                        : typeLower === "answer"
                          ? item.question
                          : typeLower === "tag"
                            ? item.name
                            : item._id,       
                  }))
                );
            }

        } else {
            const modelInfo = modelsAndTypes.find((item) => item.types === typeLower);
            // console.log("modelInfo: ", modelInfo);
            if(!modelInfo) {
                throw new Error("Invalid search type");
            }

             const queryResults = await modelInfo.model.find({
                [modelInfo.searchField]: regexQuery
             })
             .limit(8)

            //  console.log("queryResults: ", queryResults);

             results = queryResults.map((item) => (
                {
                    title: typeLower === "answer" ? `Answer containing ${query}` : `${item[modelInfo.searchField]}`,
                    types: typeLower,
                    id: typeLower === "user" ? item.clerkId : typeLower === "answer" ? item.question : typeLower === "tag" ? item.name : item._id,
                }
             ))
        }
        
        // console.log("results: ", results);
        return JSON.stringify(results);
    } catch (error) {
        console.log("Error fethcing global search: ", error);
        throw error;
    }
}