import type { AnswerCommentsRepository } from "../../application/repositories/answer-comments-repository";
import type { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface fetchAnswerCommentsUseCaseRequest {
   page: number;
   answerId: string;
}

export interface fetchAnswerCommentsUseCaseResponse {
    answerComments: AnswerComment[];
}

// :Promise<getAnswerBySlugUseCaseResponse>

export class fetchAnswerCommentsUseCase {

    constructor(private answerCommentRepository: AnswerCommentsRepository) { }

    async execute({ page, answerId }: fetchAnswerCommentsUseCaseRequest): Promise<fetchAnswerCommentsUseCaseResponse> {

        const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId, { page });

        if (!answerComments) {
            throw new Error("Answer comments not found");
        }

        return { answerComments: answerComments }
    }
}