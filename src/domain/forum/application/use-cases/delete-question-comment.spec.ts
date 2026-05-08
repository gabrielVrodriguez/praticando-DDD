import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { deleteQuestionCommentUseCase } from './delete-question-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed.error';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: deleteQuestionCommentUseCase;

describe('delete question comment', () => {

    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
        sut = new deleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
    })

    it('should be able to delete a question comment', async () => {

        const questionComment = makeQuestionComment({ authorId: new UniqueEntityId('gabriel') });
        await inMemoryQuestionCommentsRepository.create(questionComment);

        await sut.execute({
            authorId: 'gabriel',
            questionCommentId: questionComment.id.toString(),
        })

        expect(inMemoryQuestionCommentsRepository.items[0]).toBeFalsy();
    })


    it('should not be able to delete another user question comment', async () => {

        const questionComment = makeQuestionComment({ authorId: new UniqueEntityId('gabriel') });
        await inMemoryQuestionCommentsRepository.create(questionComment);

        const result = await sut.execute({
            authorId: 'john',
            questionCommentId: questionComment.id.toString(),
        })

        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);

    })

});
