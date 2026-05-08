import type { QuestionsRepository } from "../repositories/questions-repository";
import {right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed.error";

export interface editQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
}

export type editQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;




export class editQuestionUseCase {

    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ questionId, authorId, title, content }: editQuestionUseCaseRequest): Promise<editQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError());
        }

        question.title = title;
        question.content = content;

        await this.questionRepository.save(question);

        return right({});
    }

}