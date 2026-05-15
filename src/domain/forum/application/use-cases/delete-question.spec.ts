import { InMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { deleteQuestionUseCase } from './delete-question';

import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments.repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: deleteQuestionUseCase;


describe('delete a question', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
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

        inMemoryQuestionAttachmentsRepository.items.push(
            makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityId('1')
            }),

            makeQuestionAttachment({
                questionId: newQuestion.id,
                attachmentId: new UniqueEntityId('2')
            }),
        )

        await sut.execute({ questionId: question.id.toString(), authorId: question.authorId.toString() })

        expect(inMemoryQuestionsRepository.items).toHaveLength(0);
        expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0);
    })

    it('should not be able to delete a question if the author is different', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({ questionId: newQuestion.id.toString(), authorId: 'different-author-id' })

        expect(result.isLeft()).toBe(true);
        expect(inMemoryQuestionsRepository.items).toHaveLength(1);

    })
});
