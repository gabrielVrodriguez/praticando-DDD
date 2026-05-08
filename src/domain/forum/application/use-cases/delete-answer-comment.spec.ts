import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { deleteAnswerCommentUseCase } from './delete-answer-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed.error';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: deleteAnswerCommentUseCase;

describe('delete answer comment', () => {

    beforeEach(() => {
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
        sut = new deleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
    })

    it('should be able to delete a answer comment', async () => {

        const answerComment = makeAnswerComment({ authorId: new UniqueEntityId('gabriel') });
        await inMemoryAnswerCommentsRepository.create(answerComment);

        await sut.execute({
            authorId: 'gabriel',
            answerCommentId: answerComment.id.toString(),
        })

        expect(inMemoryAnswerCommentsRepository.items[0]).toBeFalsy();
    })


    it('should not be able to delete another user answer comment', async () => {

        const answerComment = makeAnswerComment({ authorId: new UniqueEntityId('gabriel') });
        await inMemoryAnswerCommentsRepository.create(answerComment);

        const result = await sut.execute({
            authorId: 'john',
            answerCommentId: answerComment.id.toString(),
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);


    })

});
