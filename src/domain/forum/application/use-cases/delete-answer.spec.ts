import { InMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository';
import { DeleteAnswerUseCase } from './delete-answer';

import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from '../../../../core/errors/not-allowed.error';
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment';
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments.repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: DeleteAnswerUseCase;


describe('delete a answer', () => {

    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
        sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
    })

    it('should be able to delete a answer', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryAnswersRepository.create(newAnswer)

        const answer = await inMemoryAnswersRepository.findById(newAnswer.id.toString());


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

        if (!answer) {
            throw new Error('Answer not found');
        }

        const result = await sut.execute({ answerId: answer.id.toString(), authorId: answer.authorId.toString() })

        expect(result.isRight()).toBe(true);

    })

    it('should not be able to delete a answer if the author is different', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryAnswersRepository.create(newAnswer)

        const result = await sut.execute({ answerId: newAnswer.id.toString(), authorId: 'different-author-id' })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);

    })
});
