import { Answer } from "../../enterprise/entities/answer";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import type { AnswerCommentsRepository } from "../repositories/answer-comments-repository";
import { type AnswersRepository } from "../repositories/answers-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

interface commentOnAnswerUseCaseRequest {
    authorId: string;
    answerId: string;
    content: string;
}

interface commentOnAnswerUseCaseResponse {
    answer: AnswerComment;
}


export class commentOnAnswerUseCase {


    constructor(
        private answerRepository: AnswersRepository,
        private answerCommentsRepository: AnswerCommentsRepository
    ) { }

    async execute({ authorId, answerId, content }: commentOnAnswerUseCaseRequest): Promise<commentOnAnswerUseCaseResponse> {

        const answer = await this.answerRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found");
        }

        const answerComment = AnswerComment.create({
           answerId: new UniqueEntityId(answerId),
           authorId: new UniqueEntityId('gabriel'),
           content
        })

        await this.answerCommentsRepository.create(answerComment);


        return { answer: answerComment }

       

       ;
    }
}