import { inMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { editQuestionUseCase } from './edit-question';

import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let questionsRepository: inMemoryQuestionsRepository;
let sut: editQuestionUseCase;


describe('edit a question', () => {

    beforeEach(() => {
        questionsRepository = new inMemoryQuestionsRepository();
        sut = new editQuestionUseCase(questionsRepository);
    })

    it('should be able to edit a question', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-id'),
        })

        await questionsRepository.create(newQuestion)

        const question = await questionsRepository.findById(newQuestion.id.toString());

        if (!question) {
            throw new Error('Question not found');
        }

        await sut.execute({
            questionId: newQuestion.id.toString(),
            authorId: newQuestion.authorId.toString(),
            title: 'New Title',
            content: 'New Content'
        })

        expect(question.title).toBe('New Title');
        expect(question.content).toBe('New Content');

    })

     it('should not be able to edit a question if the author is different', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-id'),
        })

        await questionsRepository.create(newQuestion)

        await expect(() =>
            sut.execute({
                questionId: newQuestion.id.toString(),
                authorId: 'different-author-id',
                title: 'New Title',
                content: 'New Content'
            })
        ).rejects.toThrow("Not allowed to edit this question");

        expect(questionsRepository.items).toHaveLength(1);

    })
});
