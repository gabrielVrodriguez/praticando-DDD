import { Question } from "../../enterprise/entities/question";
import { type QuestionsRepository } from "../repositories/questions-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import {right, type Either } from "@/core/either.js";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

interface createQuestionUseCaseRequest {
    authorId: string;
    title: string;
    content: string;
    attachmentsIds: string[];
}

type createQuestionUseCaseResponse = Either<null, { question: Question }>;


export class createQuestionUseCase {


    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ authorId, title, content, attachmentsIds }: createQuestionUseCaseRequest): Promise<createQuestionUseCaseResponse> {

        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            title,
            content
        })

        const questionAttachments = attachmentsIds.map(attachmentId => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                questionId: question.id
            })
        })

        question.attachments = questionAttachments;

        await this.questionRepository.create(question);

        return right({ question });
    }
}