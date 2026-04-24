import { type QuestionsRepository } from "../repositories/questions-repository";
import type { Question } from "../../enterprise/entities/question";
import type { getQuestionBySlugUseCaseResponse } from "./get-question-by-slug";

export interface fetchRecentQuestionsUseCaseRequest {
    page: number;
}

export interface fetchRecentQuestionsUseCaseResponse {
    questions: Question[];
}

// :Promise<getQuestionBySlugUseCaseResponse>

export class fetchRecentQuestionsUseCase {

    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ page }: fetchRecentQuestionsUseCaseRequest): Promise<fetchRecentQuestionsUseCaseResponse> {

        const questions = await this.questionRepository.findManyRecent( { page });

        if (!questions) {
            throw new Error("Questions not found");
        }

        return { questions }
    }
}