import type { Optional } from "@/core/entities/types/optional";
import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface AnswerProps {
    authorId: UniqueEntityId,
    questionId: UniqueEntityId,
    content: string,
    createdAt: Date,
    updatedAt?: Date,
}


export class Answer extends Entity<AnswerProps> {

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


    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }



    static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityId) {
        const answer = new Answer(id, {
            ...props,
            createdAt: new Date()
        });
        return answer
    }

}