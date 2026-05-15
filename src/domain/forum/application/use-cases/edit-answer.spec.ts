import { InMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository';
import { editAnswerUseCase } from './edit-answer';

import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed.error';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments.repository';
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment';


let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: editAnswerUseCase;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;

describe('edit a answer', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);

        sut = new editAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerAttachmentsRepository);
    })

    it('should be able to edit a answer', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryAnswersRepository.create(newAnswer)

        const answer = await inMemoryAnswersRepository.findById(newAnswer.id.toString());

        if (!answer) {
            throw new Error('Answer not found');
        }

        inMemoryAnswerAttachmentsRepository.items.push(
            makeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityId('1')
            }),

            makeAnswerAttachment({
                answerId: newAnswer.id,
                attachmentId: new UniqueEntityId('2')
            }),
        )

        const result = await sut.execute({
            questionId: newAnswer.id.toString(),
            authorId: newAnswer.authorId.toString(),
            content: 'New Content',
            attachmentsIds: ['1', '3']
        })

        expect(result.isRight()).toBe(true);
        expect(inMemoryAnswersRepository.items[0]?.attachments.currentItems).toHaveLength(2);
        expect(inMemoryAnswersRepository.items[0]?.attachments.getNewItems()).toHaveLength(1);
        expect(inMemoryAnswersRepository.items[0]?.attachments.getNewItems()[0]?.attachmentId.toString()).toBe('3');

    })

    it('should not be able to edit a answer if the author is different', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryAnswersRepository.create(newAnswer)


        const result = await sut.execute({
            questionId: newAnswer.id.toString(),
            authorId: 'different-author-id',
            content: 'New Content',
            attachmentsIds: ['1', '3']
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);


    })
});
