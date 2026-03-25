
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
    ) {}

    async execute({ questionId, content, authorId }: AnswerQuestionUseCaseRequest) {
        const answer = new Answer({authorId, content, questionId});

        await this.answersRepository.create(answer);

        return answer;
    }
}