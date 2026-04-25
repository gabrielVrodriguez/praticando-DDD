import { inMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository';
import { AnswerQuestionUseCase } from './answer-question';
import { fetchQuestionAnswersUseCase } from './fetch-question-answers';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let answersRepository: inMemoryAnswersRepository;
let sut: fetchQuestionAnswersUseCase;

describe('fetch question answers', () => {



    beforeEach(async () => {
        answersRepository = new inMemoryAnswersRepository();
        sut = new fetchQuestionAnswersUseCase(answersRepository);
    })

    it('should be able to fetch answers for a question', async () => {

        for (let i = 1; i <= 22; i++) {
            await answersRepository.create(makeAnswer(
                { questionId: new UniqueEntityId('question-fetch')}
            ))
        }

        const { answers } = await sut.execute({ page: 1, questionId: 'question-fetch' })

        expect(answers).toBeTruthy();
        expect(answers).toHaveLength(20);

    })

    it('should be able to fetch paginated answers for a question', async () => {

        for (let i = 1; i <= 22; i++) {
            await answersRepository.create(makeAnswer(
                { questionId: new UniqueEntityId('question-fetch')}
            ))
        }

        const { answers } = await sut.execute({ page: 2, questionId: 'question-fetch' })

        expect(answers).toBeTruthy();
        expect(answers).toHaveLength(2);
        
    })
});
