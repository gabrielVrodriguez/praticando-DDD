import type { Optional } from "@/core/entities/types/optional";
import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import  { AnswerAttachmentList } from "./answer-attachment-list";
import { AggregateRoot } from "@/core/entities/aggregate-root";
import { AnswerCreatedEvent } from "./events/answer-created-event";

export interface AnswerProps {
    authorId: UniqueEntityId,
    questionId: UniqueEntityId,
    content: string,
    attachments: AnswerAttachmentList
    createdAt: Date,
    updatedAt?: Date,
}


export class Answer extends AggregateRoot<AnswerProps> {

    get authorId() {
        return this.props.authorId;
    }

    get questionId() {
        return this.props.questionId;
    }


    get content() {
        return this.props.content;
    }

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }

    get attachments() {
        return this.props.attachments;
    }

    set attachments(attachments: AnswerAttachmentList) {
        this.props.attachments = attachments;
        this.touch();
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }



    static create(props: Optional<AnswerProps, 'createdAt' | 'attachments'>, id?: UniqueEntityId) {
        const answer = new Answer(id, {
            ...props,
            attachments: props.attachments ?? new AnswerAttachmentList(),
            createdAt: new Date()
        });

        const isNewAnswer = !id;

        if (isNewAnswer) {
             answer.addDomainEvent(new AnswerCreatedEvent(answer))
        }
        
        return answer
    }

}