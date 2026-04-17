import type { AnswersRepository } from "../repositories/answers-repository";


export interface deleteAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}

export interface deleteAnswerUseCaseResponse {

}


export class deleteAnswerUseCase {

    constructor(private answerRepository: AnswersRepository) { }

    async execute({ answerId, authorId }: deleteAnswerUseCaseRequest): Promise<deleteAnswerUseCaseResponse> {

        const answer = await this.answerRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found");
        }

        if (answer.authorId.toString() !== authorId) {
            throw new Error("Not allowed to delete this answer");
        }

        await this.answerRepository.delete(answer);

        return {};
    }

}