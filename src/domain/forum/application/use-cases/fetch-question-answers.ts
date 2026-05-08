import { type AnswersRepository } from "../repositories/answers-repository";
import type { Answer } from "../../enterprise/entities/answer";
import { right, type Either } from "@/core/either";

export interface fetchQuestionAnswersUseCaseRequest {
    page: number;
    questionId: string;
}

export type fetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>;


export class fetchQuestionAnswersUseCase {

    constructor(private answerRepository: AnswersRepository) { }

    async execute({ page, questionId }: fetchQuestionAnswersUseCaseRequest): Promise<fetchQuestionAnswersUseCaseResponse> {

        const answers = await this.answerRepository.findManyByQuestionId({ page, questionId });

        return right({ answers });
    }
}