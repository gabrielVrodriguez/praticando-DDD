import type { AnswersRepository } from "../repositories/answers-repository";


export interface editAnswerUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
}

export interface editAnswerUseCaseResponse {

}


export class editAnswerUseCase {

    constructor(private answerRepository: AnswersRepository) { }

    async execute({authorId, questionId, content }: editAnswerUseCaseRequest): Promise<editAnswerUseCaseResponse> {

        const answer = await this.answerRepository.findById(questionId);

        if (!answer) {
            throw new Error("Answer not found");
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error("Not allowed to edit this answer");
        }


        answer.content = content;
        
        await this.answerRepository.save(answer);

        return {};
    }

}