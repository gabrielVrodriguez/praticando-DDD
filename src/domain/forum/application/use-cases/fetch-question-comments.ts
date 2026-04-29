import type { QuestionCommentsRepository } from "../../application/repositories/question-comments-repository";
import type { QuestionComment } from "../../enterprise/entities/question-comment";

export interface fetchQuestionCommentsUseCaseRequest {
   page: number;
   questionId: string;
}

export interface fetchQuestionCommentsUseCaseResponse {
    questionComments: QuestionComment[];
}

// :Promise<getAnswerBySlugUseCaseResponse>

export class fetchQuestionCommentsUseCase {

    constructor(private questionCommentRepository: QuestionCommentsRepository) { }

    async execute({ page, questionId }: fetchQuestionCommentsUseCaseRequest): Promise<fetchQuestionCommentsUseCaseResponse> {

        const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionId, { page });

        if (!questionComments) {
            throw new Error("Question comments not found");
        }

        return { questionComments: questionComments }
    }
}