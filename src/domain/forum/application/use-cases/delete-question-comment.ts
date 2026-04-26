import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";


interface deleteQuestionCommentUseCaseRequest {
    authorId: string;
    questionCommentId: string;
}

interface deleteQuestionCommentUseCaseResponse {}


export class deleteQuestionCommentUseCase {


    constructor(
        private questionCommentsRepository: QuestionCommentsRepository
    ) { }

    async execute({ authorId, questionCommentId }: deleteQuestionCommentUseCaseRequest): Promise<deleteQuestionCommentUseCaseResponse> {

       
        const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

        if (!questionComment) {
            throw new Error("Question comment not found");
        }

        if (questionComment.authorId.toString() !== authorId) {
            throw new Error("Not allowed to delete this question comment");
        }

        await this.questionCommentsRepository.delete(questionComment);

        return {  }
    
    }
}