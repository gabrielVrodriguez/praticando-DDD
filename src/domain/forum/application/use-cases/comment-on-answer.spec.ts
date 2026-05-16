import { InMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { makeAnswer } from 'test/factories/make-answer';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;

let sut: CommentOnAnswerUseCase;

describe('comment on answer', () => {
    
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
        sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
    })

    it('should be able to coment on  answer', async () => {

        const answer = makeAnswer();
        await inMemoryAnswersRepository.create(answer);

        await sut.execute({
            authorId: 'gabriel',
            answerId: answer.id.toString(),
            content: 'This is a comment'
         })

         expect(inMemoryAnswerCommentsRepository.items[0]).toBeTruthy();
         expect(inMemoryAnswerCommentsRepository.items[0]!.content).toBe('This is a comment');
        })  


    
});
