import { type QuestionsRepository } from "../repositories/questions-repository";
import type { Question } from "../../enterprise/entities/question";
import { right, left, type Either } from "@/core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found.error";

export interface GetQuestionBySlugUseCaseRequest {
    slug: string;
}

export type GetQuestionBySlugUseCaseResponse = Either<ResourceNotFoundError, { question: Question }>;


export class GetQuestionBySlugUseCase {

    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ slug }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {

        const question = await this.questionRepository.findBySlug(slug);

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        return right({ question });
    }
}