
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { Answer } from '../../enterprise/entities/answer.js';
import type { AnswersRepository } from '../repositories/answers-repository.js';
import type { QuestionsRepository } from '../repositories/questions-repository.js';
import type { Question } from '../../enterprise/entities/question.js';

interface ChooseBestAnswerUseCaseRequest {
    answerId: string;
    authorId: string;

}

interface ChooseBestAnswerUseCaseResponse {
    question: Question
}

export class ChooseBestAnswerUseCase {

    constructor(
        private answersRepository: AnswersRepository,
        private questionRepository: QuestionsRepository
    ) { }

    async execute({ answerId, authorId }: ChooseBestAnswerUseCaseRequest): Promise<ChooseBestAnswerUseCaseResponse> {

        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error("Answer not found");
        }

        const question = await this.questionRepository.findById(answer.questionId.toValue())

        if (!question) {
            throw new Error("Question not found");
        }

        if (answer.authorId.toString() === authorId) {
            throw new Error("Not allowed to choose this answer as best");
        }

        question.bestAnswerId = new UniqueEntityId(answerId);

        return { question };
      
    }
}