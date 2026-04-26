import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { deleteQuestionCommentUseCase } from './delete-question-comment';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: deleteQuestionCommentUseCase;

describe('delete question comment', () => {
    
    beforeEach(() => {
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
        sut = new deleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
    })

    it('should be able to delete a question comment', async () => {

        const questionComment = makeQuestionComment({authorId: new UniqueEntityId('gabriel')});
        await inMemoryQuestionCommentsRepository.create(questionComment);

        await sut.execute({
            authorId: 'gabriel',
            questionCommentId: questionComment.id.toString(),
         })

         expect(inMemoryQuestionCommentsRepository.items[0]).toBeFalsy();
        })  


    
});
