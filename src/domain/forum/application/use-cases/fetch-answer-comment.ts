import type { AnswerCommentsRepository } from "../../application/repositories/answer-comments-repository";
import type { AnswerComment } from "../../enterprise/entities/answer-comment";
import { right, type Either } from "@/core/either";

export interface fetchAnswerCommentsUseCaseRequest {
    page: number;
    answerId: string;
}

export type fetchAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>;


export class fetchAnswerCommentsUseCase {

    constructor(private answerCommentRepository: AnswerCommentsRepository) { }

    async execute({ page, answerId }: fetchAnswerCommentsUseCaseRequest): Promise<fetchAnswerCommentsUseCaseResponse> {

        const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId, { page });

        return right({ answerComments });
    }
}