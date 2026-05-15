import type { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments.repository";
import type { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";






export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepository {

    public items: QuestionAttachment[] = [];


    async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
        const items = this.items.filter(item => item.questionId.toString() === questionId)
        return items;
    }

    async deleteManyByQuestionId(questionId: string): Promise<void> {
        this.items = this.items.filter(item => item.questionId.toString() !== questionId)


    }



}