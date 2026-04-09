
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { Answer } from '../entities/answer.js';
import type { AnswersRepository } from '../repositories/answer-repository.js';

interface AnswerQuestionUseCaseRequest {
    questionId: string;
    content: string;
    authorId: string;

}

export class AnswerQuestionUseCase {

    constructor(
        private answersRepository: AnswersRepository
    ) { }

    async execute({ questionId, content, authorId }: AnswerQuestionUseCaseRequest) {
        
        const answer = Answer.create({
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
            content
        });

        await this.answersRepository.create(answer);

        return answer;
    }
}