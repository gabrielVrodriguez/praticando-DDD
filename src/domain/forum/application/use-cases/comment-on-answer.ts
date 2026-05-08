import { Answer } from "../../enterprise/entities/answer";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { type AnswersRepository } from "../repositories/answers-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";



interface commentOnAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
}

type commentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, {answer: AnswerComment}>



export class commentOnAnswerUseCase {


    constructor(
        private answerRepository: AnswersRepository,
        private answerCommentsRepository: AnswerCommentsRepository
    ) { }

    async execute({ authorId, answerId, content }: commentOnAnswerUseCaseRequest): Promise<commentOnAnswerUseCaseResponse> {

        const answer = await this.answerRepository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError());
        }

        const answerComment = AnswerComment.create({
            answerId: new UniqueEntityId(answerId),
            authorId: new UniqueEntityId('gabriel'),
            content
        })

        await this.answerCommentsRepository.create(answerComment);


        return right({ answer: answerComment });
    }
}