import { inMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { createQuestionUseCase } from './create-question';

let questionsRepository: inMemoryQuestionsRepository;
let sut: createQuestionUseCase;

describe('create a question', () => {
    
    beforeEach(() => {
        questionsRepository = new inMemoryQuestionsRepository();
        sut = new createQuestionUseCase(questionsRepository);
    })

    it('should be able to create a question', async () => {

        const { question } = await sut.execute({
            authorId: 'instructor-id',
            title: 'This is a question',
            content: 'This is the content of the question'
        });

        expect(question.content).toBe('This is the content of the question');

    })
});
