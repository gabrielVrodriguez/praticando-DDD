import { type QuestionsRepository } from "../repositories/questions-repository";
import type { Question } from "../../enterprise/entities/question";
import { right, left, type Either } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

export interface getQuestionBySlugUseCaseRequest {
    slug: string;
}

export type getQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: Question }>;


export class getQuestionBySlugUseCase {

    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ slug }: getQuestionBySlugUseCaseRequest): Promise<getQuestionBySlugUseCaseResponse> {

        const question = await this.questionRepository.findBySlug(slug);

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        return right({ question });
    }
}