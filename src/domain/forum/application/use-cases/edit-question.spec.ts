import { InMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { EditQuestionUseCase } from './edit-question';

import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '../../../../core/errors/not-allowed.error';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments.repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let sut: EditQuestionUseCase;


describe('edit a question', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
        sut = new EditQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository);

    })

    it('should be able to edit a question', async () => {

        const newQuestion = makeQuestion({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryQuestionsRepository.create(newQuestion)

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

        const question = await inMemoryQuestionsRepository.findById(newQuestion.id.toString());

        if (!question) {
            throw new Error('Question not found');
        }

        const result = await sut.execute({
            questionId: newQuestion.id.toString(),
            authorId: newQuestion.authorId.toString(),
            title: 'New Title',
            content: 'New Content',
            attachmentsIds: ['1', '3']
        })

        console.log(inMemoryQuestionsRepository.items[0]?.attachments.getNewItems())

        expect(result.isRight()).toBe(true);
        expect(inMemoryQuestionsRepository.items[0]?.attachments.currentItems).toHaveLength(2);
        expect(inMemoryQuestionsRepository.items[0]?.attachments.currentItems[0]?.attachmentId.toString()).toBe('1');
        expect(inMemoryQuestionsRepository.items[0]?.attachments.currentItems[1]?.attachmentId.toString()).toBe('3');
        expect(inMemoryQuestionsRepository.items[0]?.attachments.getNewItems()).toHaveLength(1);
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
            content: 'New Content',
            attachmentsIds: []
        })


        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);

    })
});
