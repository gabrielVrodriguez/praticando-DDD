import { inMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { commentOnQuestionUseCase } from './comment-on-question';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { makeQuestion } from 'test/factories/make-question';

let questionsRepository: inMemoryQuestionsRepository;
let commentOnQuestionRepository: InMemoryQuestionCommentsRepository;

let sut: commentOnQuestionUseCase;

describe('comment on question', () => {
    
    beforeEach(() => {
        questionsRepository = new inMemoryQuestionsRepository();
        commentOnQuestionRepository = new InMemoryQuestionCommentsRepository();
        sut = new commentOnQuestionUseCase(questionsRepository, commentOnQuestionRepository);
    })

    it('should be able to coment on  question', async () => {

        const question = makeQuestion();
        await questionsRepository.create(question);

        await sut.execute({
            authorId: 'gabriel',
            questionId: question.id.toString(),
            content: 'This is a comment'
         })

         expect(commentOnQuestionRepository.items[0]).toBeTruthy();
         expect(commentOnQuestionRepository.items[0]!.content).toBe('This is a comment');
        })  


    
});
