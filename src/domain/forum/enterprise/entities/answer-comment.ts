import type { Optional } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Comment, type CommentProps } from "./comment";

export interface AnswerCommentProps extends CommentProps {
    answerId: UniqueEntityId,
}


export class AnswerComment extends Comment<AnswerCommentProps> {

    get answerId() {
        return this.props.answerId;
    }

    static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityId) {
        const answer = new AnswerComment(id, {
            ...props,
            createdAt: new Date()
        });
        return answer
    }

}