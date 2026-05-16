import { Answer } from "../../enterprise/entities/answer";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { type AnswersRepository } from "../repositories/answers-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found.error";



interface CommentOnAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError, { answer: AnswerComment }>



export class CommentOnAnswerUseCase {


    constructor(
        private answerRepository: AnswersRepository,
        private answerCommentsRepository: AnswerCommentsRepository
    ) { }

    async execute({ authorId, answerId, content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {

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