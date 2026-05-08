import { InMemoryQuestionCommentsRepository } from '@/../test/repositories/in-memory-question-comments-repository';
import { fetchQuestionCommentsUseCase } from './fetch-question-comments';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: fetchQuestionCommentsUseCase;

describe('fetch question comments', () => {



    beforeEach(async () => {
        inMemoryCommentsRepository = new InMemoryQuestionCommentsRepository();
        sut = new fetchQuestionCommentsUseCase(inMemoryCommentsRepository);
    })

    it('should be able to fetch comments for a question', async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryCommentsRepository.create(makeQuestionComment(
                { questionId: new UniqueEntityId('question-fetch')}
            ))
        }

         const result = await sut.execute({ page: 1, questionId: 'question-fetch' })

        expect(result.isRight()).toBe(true);
        expect(result.value?.questionComments).toHaveLength(20);

    })

    it('should be able to fetch paginated comments for a question', async () => {

        for (let i = 1; i <= 22; i++) {
            await inMemoryCommentsRepository.create(makeQuestionComment(
                { questionId: new UniqueEntityId('question-fetch')}
            ))
        }

       const result = await sut.execute({ page: 2, questionId: 'question-fetch' })

        expect(result.isRight()).toBe(true);
        expect(result.value?.questionComments).toHaveLength(2);
        
    })
});
