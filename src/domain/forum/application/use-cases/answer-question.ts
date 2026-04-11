
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { Answer } from '../../enterprise/entities/answer.js';
import type { AnswersRepository } from '../../application/repositories/answer-repository.js';

interface AnswerQuestionUseCaseRequest {
    questionId: string;
    content: string;
    authorId: string;

}

interface AnswerQuestionUseCaseResponse {
    answer: Answer;
}

export class AnswerQuestionUseCase {

    constructor(
        private answersRepository: AnswersRepository
    ) { }

    async execute({ questionId, content, authorId }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {

        const answer = Answer.create({
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
            content
        });

        await this.answersRepository.create(answer);

        return { answer };
    }
}