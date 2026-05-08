import { InMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { editQuestionUseCase } from './edit-question';

import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed.error';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: editQuestionUseCase;


describe('edit a question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new editQuestionUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to edit a question', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryQuestionsRepository.create(newQuestion)

        const question = await inMemoryQuestionsRepository.findById(newQuestion.id.toString());

        if (!question) {
            throw new Error('Question not found');
        }

       const result =  await sut.execute({
            questionId: newQuestion.id.toString(),
            authorId: newQuestion.authorId.toString(),
            title: 'New Title',
            content: 'New Content'
        })

        expect(result.isRight()).toBe(true);
    })

     it('should not be able to edit a question if the author is different', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({
                questionId: newQuestion.id.toString(),
                authorId: 'different-author-id',
                title: 'New Title',
                content: 'New Content'
            })
     

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);

    })
});
