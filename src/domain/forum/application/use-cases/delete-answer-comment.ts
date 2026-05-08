import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed.error";

interface deleteAnswerCommentUseCaseRequest {
    authorId: string;
    answerCommentId: string;
}

type deleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;


export class deleteAnswerCommentUseCase {


    constructor(
        private answerCommentsRepository: AnswerCommentsRepository
    ) { }

    async execute({ authorId, answerCommentId }: deleteAnswerCommentUseCaseRequest): Promise<deleteAnswerCommentUseCaseResponse> {


        const answerComment = await this.answerCommentsRepository.findById(answerCommentId);

        if (!answerComment) {
            return left(new ResourceNotFoundError());
        }

        if (answerComment.authorId.toString() !== authorId) {
            return left(new NotAllowedError());
        }

        await this.answerCommentsRepository.delete(answerComment);

        return right({});

    }
}