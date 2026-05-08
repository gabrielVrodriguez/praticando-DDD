
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { Answer } from '../../enterprise/entities/answer.js';
import type { AnswersRepository } from '../repositories/answers-repository.js';
import { right, type Either } from '@/core/either.js';

interface AnswerQuestionUseCaseRequest {
    questionId: string;
    content: string;
    authorId: string;

}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

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

        return right({ answer });
    }
}