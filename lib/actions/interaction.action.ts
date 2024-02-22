"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId } = params;

    // Update the question's views count
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      // Check for existing interaction
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction)
        return console.log("User has already viewed this question");

      // Create new interaction if user has not previously viewed the question

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}
