import type { QuestionsRepository } from "../repositories/questions-repository";


export interface editQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
}

export interface editQuestionUseCaseResponse {

}


export class editQuestionUseCase {

    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ questionId, authorId, title, content }: editQuestionUseCaseRequest): Promise<editQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            throw new Error("Question not found");
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error("Not allowed to edit this question");
        }

        question.title = title;
        question.content = content;

        await this.questionRepository.save(question);

        return {};
    }

}