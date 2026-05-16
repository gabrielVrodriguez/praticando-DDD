import { Question } from "../../enterprise/entities/question";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { type QuestionsRepository } from "../repositories/questions-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found.error";


interface CommentOnQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
}

type CommentOnQuestionUseCaseResponse = Either<ResourceNotFoundError, { question: QuestionComment }>;


export class CommentOnQuestionUseCase {


    constructor(
        private questionRepository: QuestionsRepository,
        private questionCommentsRepository: QuestionCommentsRepository
    ) { }

    async execute({ authorId, questionId, content }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        const questionComment = QuestionComment.create({
            questionId: new UniqueEntityId(questionId),
            authorId: new UniqueEntityId('gabriel'),
            content
        })

        await this.questionCommentsRepository.create(questionComment);


        return right({ question: questionComment });



        ;
    }
}