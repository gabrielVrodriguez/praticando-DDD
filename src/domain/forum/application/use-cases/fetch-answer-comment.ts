import type { AnswerCommentsRepository } from "../../application/repositories/answer-comments-repository";
import type { AnswerComment } from "../../enterprise/entities/answer-comment";
import { right, type Either } from "@/core/either";

export interface FetchAnswerCommentsUseCaseRequest {
    page: number;
    answerId: string;
}

export type FetchAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>;


export class FetchAnswerCommentsUseCase {

    constructor(private answerCommentRepository: AnswerCommentsRepository) { }

    async execute({ page, answerId }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {

        const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId, { page });

        return right({ answerComments });
    }
}