import type { AnswersRepository } from "../repositories/answers-repository";
import {right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed.error";


export interface editAnswerUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
}

export type editAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;


export class editAnswerUseCase {

    constructor(private answerRepository: AnswersRepository) { }

    async execute({authorId, questionId, content }: editAnswerUseCaseRequest): Promise<editAnswerUseCaseResponse> {

        const answer = await this.answerRepository.findById(questionId);

        if (!answer) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError());
        }


        answer.content = content;
        
        await this.answerRepository.save(answer);

        return right({});
    }

}