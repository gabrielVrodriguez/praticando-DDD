import type { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";
import type { PaginationParams } from "@/core/repositories/pagination.params";





export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {

    public items: QuestionComment[] = [];

    async create(questionComment: QuestionComment): Promise<QuestionComment> {
        this.items.push(questionComment);
        return questionComment;
    }

    async delete(questionComment: QuestionComment): Promise<void> {
        const questionCommentIdx = this.items.findIndex(item => item.id === questionComment.id);

        if (questionCommentIdx !== -1) {
            this.items.splice(questionCommentIdx, 1);
        }


    }
    async findById(id: string): Promise<QuestionComment | null> {
        const questionComment = this.items.find(item => item.id.toString() === id);
        return questionComment ?? null;
    }

    async findManyByQuestionId(questionId: string, {page}: PaginationParams): Promise<QuestionComment[]> {
        const items = this.items.filter(item => item.questionId.toString() === questionId)
            .slice((page - 1) * 20, page * 20);
        return items;
    }

}