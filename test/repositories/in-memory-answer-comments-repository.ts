import type { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository";
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";






export class InMemoryAnswerCommentsRepository implements AnswerCommentsRepository{

    public items: AnswerComment[] = [];

    async create(answerComment: AnswerComment): Promise<AnswerComment> {
       this.items.push(answerComment);
        return answerComment;
    }

    async delete(answerComment: AnswerComment): Promise<void> {
        const answerCommentIdx = this.items.findIndex(item => item.id === answerComment.id);

        if (answerCommentIdx !== -1) {
            this.items.splice(answerCommentIdx, 1);
        }

        
    }
    async findById(id: string): Promise<AnswerComment | null> {
        throw new Error("Method not implemented.");
    }
    async findManyByAnswerId(answerId: string): Promise<AnswerComment[]> {
        throw new Error("Method not implemented.");
    }
    
}