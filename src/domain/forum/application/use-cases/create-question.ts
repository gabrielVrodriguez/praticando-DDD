import { Question } from "../../enterprise/entities/question";
import { type QuestionRepository } from "../repositories/question-repository";
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


    constructor(private questionRepository: QuestionRepository) { }

    async execute({authorId, title, content}: createQuestionUseCaseRequest): Promise<createQuestionUseCaseResponse> {

        const question = Question.create({
            authorId: new UniqueEntityId(authorId), 
            title, 
            content
        })

        await this.questionRepository.create(question);

        return { question };
    }
}