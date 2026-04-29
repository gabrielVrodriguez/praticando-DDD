import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";


interface deleteAnswerCommentUseCaseRequest {
    authorId: string;
    answerCommentId: string;
}

interface deleteAnswerCommentUseCaseResponse {}


export class deleteAnswerCommentUseCase {


    constructor(
        private answerCommentsRepository: AnswerCommentsRepository
    ) { }

    async execute({ authorId, answerCommentId }: deleteAnswerCommentUseCaseRequest): Promise<deleteAnswerCommentUseCaseResponse> {

       
        const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

        if (!answerComment) {
            throw new Error("Answer comment not found");
        }

        if (answerComment.authorId.toString() !== authorId) {
            throw new Error("Not allowed to delete this answer comment");
        }

        await this.answerCommentsRepository.delete(answerComment);

        return {  }
    
    }
}