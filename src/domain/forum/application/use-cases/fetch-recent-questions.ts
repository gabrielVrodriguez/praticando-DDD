import { type QuestionsRepository } from "../repositories/questions-repository";
import type { Question } from "../../enterprise/entities/question";
import { right, type Either } from "@/core/either";

export interface FetchRecentQuestionsUseCaseRequest {
    page: number;
}

export type FetchRecentQuestionsUseCaseResponse = Either<null, { questions: Question[] }>;


export class FetchRecentQuestionsUseCase {

    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {

        const questions = await this.questionRepository.findManyRecent({ page });

        return right({ questions });
    }
}