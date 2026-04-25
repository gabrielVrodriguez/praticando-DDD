import type { PaginationParams } from "@/core/repositories/pagination.params";
import { Answer } from "../../enterprise/entities/answer"
import type { fetchQuestionAnswersUseCaseRequest } from "../use-cases/fetch-question-answers";


export interface AnswersRepository {
    findById(id: string): Promise<Answer | null>;
    findManyByQuestionId({ page, questionId }: fetchQuestionAnswersUseCaseRequest): Promise<Answer[]>;
    create(answer: Answer): Promise<void>;
    delete(answer: Answer): Promise<void>;
    save(answer: Answer): Promise<void>;
}