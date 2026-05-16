import { InMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository';
import { FetchQuestionAnswersUseCase } from './fetch-question-answers';
import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments.repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: FetchQuestionAnswersUseCase;

describe('fetch question answers', () => {



    beforeEach(async () => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
        sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
    })

    it('should be able to fetch answers for a question', async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswersRepository.create(makeAnswer(
                { questionId: new UniqueEntityId('question-fetch') }
            ))
        }

        const result = await sut.execute({ page: 1, questionId: 'question-fetch' })

        expect(result.isRight()).toBe(true);
        expect(result.value?.answers).toHaveLength(20);

    })

    it('should be able to fetch paginated answers for a question', async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryAnswersRepository.create(makeAnswer(
                { questionId: new UniqueEntityId('question-fetch') }
            ))
        }

        const result = await sut.execute({ page: 2, questionId: 'question-fetch' })

        expect(result.isRight()).toBe(true);
        expect(result.value?.answers).toHaveLength(2);

    })
});
