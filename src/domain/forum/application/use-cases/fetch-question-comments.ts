import type { QuestionCommentsRepository } from "../../application/repositories/question-comments-repository";
import type { QuestionComment } from "../../enterprise/entities/question-comment";
import { right, type Either } from "@/core/either";

export interface FetchQuestionCommentsUseCaseRequest {
    page: number;
    questionId: string;
}

export type FetchQuestionCommentsUseCaseResponse = Either<null, { questionComments: QuestionComment[] }>;


export class FetchQuestionCommentsUseCase {

    constructor(private questionCommentRepository: QuestionCommentsRepository) { }

    async execute({ page, questionId }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {

        const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionId, { page });

        return right({ questionComments });
    }
}