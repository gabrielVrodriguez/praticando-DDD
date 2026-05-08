import { type QuestionsRepository } from "../repositories/questions-repository";
import type { Question } from "../../enterprise/entities/question";
import { right, type Either } from "@/core/either";

export interface fetchRecentQuestionsUseCaseRequest {
    page: number;
}

export type fetchRecentQuestionsUseCaseResponse = Either<null, { questions: Question[] }>;


export class fetchRecentQuestionsUseCase {

    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ page }: fetchRecentQuestionsUseCaseRequest): Promise<fetchRecentQuestionsUseCaseResponse> {

        const questions = await this.questionRepository.findManyRecent({ page });

        return right({ questions });
    }
}