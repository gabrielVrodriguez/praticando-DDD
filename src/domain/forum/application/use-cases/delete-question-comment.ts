import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import {right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed.error";
interface deleteQuestionCommentUseCaseRequest {
    authorId: string;
    questionCommentId: string;
}

type deleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;


export class deleteQuestionCommentUseCase {


    constructor(
        private questionCommentsRepository: QuestionCommentsRepository
    ) { }

    async execute({ authorId, questionCommentId }: deleteQuestionCommentUseCaseRequest): Promise<deleteQuestionCommentUseCaseResponse> {

       
        const questionComment = await this.questionCommentsRepository.findById(questionCommentId);

        if (!questionComment) {
            return left(new ResourceNotFoundError());
        }

        if (questionComment.authorId.toString() !== authorId) {
            return left(new NotAllowedError());
        }

        await this.questionCommentsRepository.delete(questionComment);

        return right({});
    
    }
}