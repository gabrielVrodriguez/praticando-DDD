import type { QuestionsRepository } from "../repositories/questions-repository";
import {right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed.error";

export interface deleteQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
}

export type deleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,  {}>;


export class deleteQuestionUseCase {

    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ questionId, authorId }: deleteQuestionUseCaseRequest): Promise<deleteQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        if (question.authorId.toString() !== authorId) {
            return left(new NotAllowedError());
        }

        await this.questionRepository.delete(question);

        return right({});
    }

}