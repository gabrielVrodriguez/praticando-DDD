import { Question } from "../../enterprise/entities/question";
import { type QuestionsRepository } from "../repositories/questions-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

interface createQuestionUseCaseRequest {
    authorId: string;
    title: string;
    content: string;
}

interface createQuestionUseCaseResponse {
    question: Question;
}


export class createQuestionUseCase {


    constructor(private questionRepository: QuestionsRepository) { }

    async execute({ authorId, title, content }: createQuestionUseCaseRequest): Promise<createQuestionUseCaseResponse> {

        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            title,
            content
        })

        await this.questionRepository.create(question);

        return { question };
    }
}