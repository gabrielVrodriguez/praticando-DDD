import type { AnswersRepository } from "../repositories/answers-repository";
import { left, right} from "@/core/either";
import type { Either } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed.error";

export interface deleteAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
}

export type deleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>; 




export class deleteAnswerUseCase {

    constructor(private answerRepository: AnswersRepository) { }

    async execute({ answerId, authorId }: deleteAnswerUseCaseRequest): Promise<deleteAnswerUseCaseResponse> {

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