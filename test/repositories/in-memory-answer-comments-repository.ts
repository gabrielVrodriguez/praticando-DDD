import type { PaginationParams } from "@/core/repositories/pagination.params";
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
        const answerComment = this.items.find(item => item.id.toString() === id);
        return answerComment ?? null;
    }

    async findManyByAnswerId(answerId: string, {page}: PaginationParams): Promise<AnswerComment[]> {
            const items = this.items.filter(item => item.answerId.toString() === answerId)
                .slice((page - 1) * 20, page * 20);
            return items;
        }
    
}