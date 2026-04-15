import { type QuestionRepository } from "../../application/repositories/question-repository";
import type { Question } from "../../enterprise/entities/question";

export interface getQuestionBySlugUseCaseRequest {
    slug: string;
}

export interface getQuestionBySlugUseCaseResponse {
    question: Question;
}

// :Promise<getQuestionBySlugUseCaseResponse>

export class getQuestionBySlugUseCase {

    constructor(private questionRepository: QuestionRepository) {}

    async execute({ slug }: getQuestionBySlugUseCaseRequest): Promise<getQuestionBySlugUseCaseResponse> {
        
        const question  = await this.questionRepository.findBySlug(slug);

        if (!question) {
            throw new Error("Question not found");
        }

        return { question }
    }
}