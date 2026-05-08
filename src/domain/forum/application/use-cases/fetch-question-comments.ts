import type { QuestionCommentsRepository } from "../../application/repositories/question-comments-repository";
import type { QuestionComment } from "../../enterprise/entities/question-comment";
import { right, type Either } from "@/core/either";

export interface fetchQuestionCommentsUseCaseRequest {
    page: number;
    questionId: string;
}

export type fetchQuestionCommentsUseCaseResponse = Either<null, { questionComments: QuestionComment[] }>;


export class fetchQuestionCommentsUseCase {

    constructor(private questionCommentRepository: QuestionCommentsRepository) { }

    async execute({ page, questionId }: fetchQuestionCommentsUseCaseRequest): Promise<fetchQuestionCommentsUseCaseResponse> {

        const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionId, { page });

        return right({ questionComments });
    }
}