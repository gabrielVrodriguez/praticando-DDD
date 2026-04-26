import type { AnswerComment } from "../../enterprise/entities/answer-comment";



export interface AnswerCommentsRepository {
    create(answerComment: AnswerComment): Promise<AnswerComment>;
    delete(answerComment: AnswerComment): Promise<void>;
    findById(id: string): Promise<AnswerComment | null>;
    findManyByAnswerId(answerId: string): Promise<AnswerComment[]>;

}