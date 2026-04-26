import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { faker } from '@faker-js/faker'
import { QuestionComment } from "src/domain/forum/enterprise/entities/question-comment";
    import type { QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment";
export function makeQuestionComment(
    override: Partial<QuestionCommentProps> = {},
    id?: UniqueEntityId
) {
    const questionComment = QuestionComment.create({
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: faker.lorem.text(),
        ...override
    }, id)

    return questionComment;
}

