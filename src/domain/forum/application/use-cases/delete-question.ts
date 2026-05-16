import type { QuestionsRepository } from "../repositories/questions-repository";
import { right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found.error";
import { NotAllowedError } from "../../../../core/errors/not-allowed.error";

export interface DeleteQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
}

export type DeleteQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;


export class DeleteQuestionUseCase {

    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ questionId, authorId }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

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