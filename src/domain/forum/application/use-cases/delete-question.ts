import type { QuestionsRepository } from "../repositories/questions-repository";


export interface deleteQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
}

export interface deleteQuestionUseCaseResponse {

}


export class deleteQuestionUseCase {

    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ questionId, authorId }: deleteQuestionUseCaseRequest): Promise<deleteQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            throw new Error("Question not found");
        }

        if (question.authorId.toString() !== authorId) {
            throw new Error("Not allowed to delete this question");
        }

        await this.questionRepository.delete(question);

        return {};
    }

}