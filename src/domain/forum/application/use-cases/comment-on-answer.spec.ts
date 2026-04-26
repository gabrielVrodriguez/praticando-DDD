import { inMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository';
import { commentOnAnswerUseCase } from './comment-on-answer';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { makeAnswer } from 'test/factories/make-answer';

let answersRepository: inMemoryAnswersRepository;
let commentOnAnswerRepository: InMemoryAnswerCommentsRepository;

let sut: commentOnAnswerUseCase;

describe('comment on answer', () => {
    
    beforeEach(() => {
        answersRepository = new inMemoryAnswersRepository();
        commentOnAnswerRepository = new InMemoryAnswerCommentsRepository();
        sut = new commentOnAnswerUseCase(answersRepository, commentOnAnswerRepository);
    })

    it('should be able to coment on  answer', async () => {

        const answer = makeAnswer();
        await answersRepository.create(answer);

        await sut.execute({
            authorId: 'gabriel',
            answerId: answer.id.toString(),
            content: 'This is a comment'
         })

         expect(commentOnAnswerRepository.items[0]).toBeTruthy();
         expect(commentOnAnswerRepository.items[0]!.content).toBe('This is a comment');
        })  


    
});
