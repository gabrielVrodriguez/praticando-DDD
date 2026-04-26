import { InMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { deleteQuestionUseCase } from './delete-question';

import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: deleteQuestionUseCase;


describe('delete a question', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new deleteQuestionUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to delete a question', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryQuestionsRepository.create(newQuestion)

        const question = await inMemoryQuestionsRepository.findById(newQuestion.id.toString());

        if (!question) {
            throw new Error('Question not found');
        }

        await sut.execute({questionId: question.id.toString(), authorId: question.authorId.toString()})

        expect(inMemoryQuestionsRepository.items).toHaveLength(0);

    })

     it('should not be able to delete a question if the author is different', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryQuestionsRepository.create(newQuestion)

        await expect(() =>
            sut.execute({questionId: newQuestion.id.toString(), authorId: 'different-author-id'})
        ).rejects.toThrow("Not allowed to delete this question");

        expect(inMemoryQuestionsRepository.items).toHaveLength(1);

    })
});
