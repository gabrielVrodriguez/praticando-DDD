import { type AnswersRepository } from "../repositories/answers-repository";
import type { Answer } from "../../enterprise/entities/answer";
import { right, type Either } from "@/core/either";

export interface FetchQuestionAnswersUseCaseRequest {
    page: number;
    questionId: string;
}

export type FetchQuestionAnswersUseCaseResponse = Either<null, { answers: Answer[] }>;


export class FetchQuestionAnswersUseCase {

    constructor(private answerRepository: AnswersRepository) { }

    async execute({ page, questionId }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {

        const answers = await this.answerRepository.findManyByQuestionId({ page, questionId });

        return right({ answers });
    }
}