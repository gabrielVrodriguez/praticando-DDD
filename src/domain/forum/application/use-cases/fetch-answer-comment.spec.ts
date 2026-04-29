import { InMemoryAnswerCommentsRepository } from '@/../test/repositories/in-memory-answer-comments-repository';
import { fetchAnswerCommentsUseCase } from './fetch-answer-comment';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: fetchAnswerCommentsUseCase;

describe('fetch answer comments', () => {



    beforeEach(async () => {
        inMemoryCommentsRepository = new InMemoryAnswerCommentsRepository();
        sut = new fetchAnswerCommentsUseCase(inMemoryCommentsRepository);
    })

    it('should be able to fetch comments for a answer', async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryCommentsRepository.create(makeAnswerComment(
                { answerId: new UniqueEntityId('answer-fetch')}
            ))
        }

        const { answerComments } = await sut.execute({ page: 1, answerId: 'answer-fetch' })

        expect(answerComments).toBeTruthy();
        expect(answerComments).toHaveLength(20);

    })

    it('should be able to fetch paginated comments for a answer', async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryCommentsRepository.create(makeAnswerComment(
                { answerId: new UniqueEntityId('answer-fetch')}
            ))
        }

        const { answerComments } = await sut.execute({ page: 2, answerId: 'answer-fetch' })

        expect(answerComments).toBeTruthy();
        expect(answerComments).toHaveLength(2);
        
    })
});
