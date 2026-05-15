import { InMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { createQuestionUseCase } from './create-question';
import  { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments.repository';


let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;

let sut: createQuestionUseCase;

describe('create a question', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);

        sut = new createQuestionUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to create a question', async () => {
 
        const result = await sut.execute({
            authorId: 'instructor-id',
            title: 'This is a question',
            content: 'This is the content of the question',
            attachmentsIds: ['1', '2']

        });

        expect(result.isRight()).toBe(true);
        expect(result.value?.question.content).toBe('This is the content of the question');
        expect(inMemoryQuestionsRepository.items[0]?.attachments.currentItems).toHaveLength(2);

    })
});
