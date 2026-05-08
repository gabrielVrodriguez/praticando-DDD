
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { Answer } from '../../enterprise/entities/answer.js';
import type { AnswersRepository } from '../repositories/answers-repository.js';
import type { QuestionsRepository } from '../repositories/questions-repository.js';
import type { Question } from '../../enterprise/entities/question.js';
import  { right, left,type Either } from '@/core/either.js';
import { ResourceNotFoundError } from './errors/resource-not-found.error.js';
import { NotAllowedError } from './errors/not-allowed.error.js';
interface ChooseBestAnswerUseCaseRequest {
    answerId: string;
    authorId: string;

}

type ChooseBestAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, { question: Question }>

export class ChooseBestAnswerUseCase {

    constructor(
        private answersRepository: AnswersRepository,
        private questionRepository: QuestionsRepository
    ) { }

    async execute({ answerId, authorId }: ChooseBestAnswerUseCaseRequest): Promise<ChooseBestAnswerUseCaseResponse> {

        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
           return left(new ResourceNotFoundError());
        }

        const question = await this.questionRepository.findById(answer.questionId.toValue())

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        if (answer.authorId.toString() === authorId) {
            return left(new NotAllowedError());
        }

        question.bestAnswerId = new UniqueEntityId(answerId);

        return right({ question });
      
    }
}