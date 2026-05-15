import type { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments.repository";
import type { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";






export class InMemoryAnswerAttachmentsRepository implements AnswerAttachmentsRepository {

    public items: AnswerAttachment[] = [];


    async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
        const items = this.items.filter(item => item.answerId.toString() === answerId)
        return items;
    }

    async deleteManyByAnswerId(answerId: string): Promise<void> {
        this.items = this.items.filter(item => item.answerId.toString() !== answerId)


    }



}