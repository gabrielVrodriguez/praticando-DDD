import { type AnswersRepository } from "../repositories/answers-repository";
import type { Answer } from "../../enterprise/entities/answer";

export interface fetchQuestionAnswersUseCaseRequest {
   page: number;
   questionId: string;
}

export interface fetchQuestionAnswersUseCaseResponse {
    answers: Answer[];
}

// :Promise<getAnswerBySlugUseCaseResponse>

export class fetchQuestionAnswersUseCase {

    constructor(private answerRepository: AnswersRepository) { }

    async execute({ page, questionId }: fetchQuestionAnswersUseCaseRequest): Promise<fetchQuestionAnswersUseCaseResponse> {

        const answers = await this.answerRepository.findManyByQuestionId({ page, questionId });

        if (!answers) {
            throw new Error("Answers not found");
        }

        return { answers }
    }
}