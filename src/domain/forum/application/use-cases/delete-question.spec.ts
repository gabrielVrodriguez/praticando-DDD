import { inMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { deleteQuestionUseCase } from './delete-question';

import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let questionsRepository: inMemoryQuestionsRepository;
let sut: deleteQuestionUseCase;


describe('delete a question', () => {

    beforeEach(() => {
        questionsRepository = new inMemoryQuestionsRepository();
        sut = new deleteQuestionUseCase(questionsRepository);
    })

    it('should be able to delete a question', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-id'),
        })

        await questionsRepository.create(newQuestion)

        const question = await questionsRepository.findById(newQuestion.id.toString());

        if (!question) {
            throw new Error('Question not found');
        }

        await sut.execute({questionId: question.id.toString(), authorId: question.authorId.toString()})

        expect(questionsRepository.items).toHaveLength(0);

    })

     it('should not be able to delete a question if the author is different', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-id'),
        })

        await questionsRepository.create(newQuestion)

        await expect(() =>
            sut.execute({questionId: newQuestion.id.toString(), authorId: 'different-author-id'})
        ).rejects.toThrow("Not allowed to delete this question");

        expect(questionsRepository.items).toHaveLength(1);

    })
});
