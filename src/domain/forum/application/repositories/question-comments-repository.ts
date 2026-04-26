import { QuestionComment } from "../../enterprise/entities/question-comment";



export interface QuestionCommentsRepository {
    create(questionComment: QuestionComment): Promise<QuestionComment>;
    delete(questionComment: QuestionComment): Promise<void>;
    findById(id: string): Promise<QuestionComment | null>;
    findManyByQuestionId(questionId: string): Promise<QuestionComment[]>;


}