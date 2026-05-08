import { InMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { createQuestionUseCase } from './create-question';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: createQuestionUseCase;

describe('create a question', () => {
    
    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new createQuestionUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to create a question', async () => {

        const result = await sut.execute({
            authorId: 'instructor-id',
            title: 'This is a question',
            content: 'This is the content of the question'
        });

        expect(result.isRight()).toBe(true);
        expect(result.value?.question.content).toBe('This is the content of the question');

    })
});
