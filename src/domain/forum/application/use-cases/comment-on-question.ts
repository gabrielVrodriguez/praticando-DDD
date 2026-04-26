import { Question } from "../../enterprise/entities/question";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import type { QuestionCommentsRepository } from "../repositories/question-comments-repository";
import { type QuestionsRepository } from "../repositories/questions-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

interface commentOnQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
}

interface commentOnQuestionUseCaseResponse {
    question: QuestionComment;
}


export class commentOnQuestionUseCase {


    constructor(
        private questionRepository: QuestionsRepository,
        private questionCommentsRepository: QuestionCommentsRepository
    ) { }

    async execute({ authorId, questionId, content }: commentOnQuestionUseCaseRequest): Promise<commentOnQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            throw new Error("Question not found");
        }

        const questionComment = QuestionComment.create({
           questionId: new UniqueEntityId(questionId),
           authorId: new UniqueEntityId('gabriel'),
           content
        })

        await this.questionCommentsRepository.create(questionComment);


        return { question: questionComment }

       

       ;
    }
}