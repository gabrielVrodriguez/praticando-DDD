import type { AnswersRepository } from "../repositories/answers-repository";
import { left, right } from "@/core/either";
import type { Either } from "@/core/either";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found.error";
import { NotAllowedError } from "../../../../core/errors/not-allowed.error";

export interface DeleteAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}

export type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;




export class DeleteAnswerUseCase {

    constructor(private answerRepository: AnswersRepository) { }

    async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {

        const answer = await this.answerRepository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError());
        }

        if (answer.authorId.toString() !== authorId) {
            return left(new NotAllowedError());
        }

        await this.answerRepository.delete(answer);

        return right({});
    }

}