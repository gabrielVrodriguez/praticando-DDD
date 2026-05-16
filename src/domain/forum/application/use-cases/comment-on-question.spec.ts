import { InMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments.repository';

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;

let sut: CommentOnQuestionUseCase;

describe('comment on question', () => {
    
    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
        inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository();
        sut = new CommentOnQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionCommentsRepository);
    })

    it('should be able to coment on  question', async () => {

        const question = makeQuestion();
        await inMemoryQuestionsRepository.create(question);

        await sut.execute({
            authorId: 'gabriel',
            questionId: question.id.toString(),
            content: 'This is a comment'
         })

         expect(inMemoryQuestionCommentsRepository.items[0]).toBeTruthy();
         expect(inMemoryQuestionCommentsRepository.items[0]!.content).toBe('This is a comment');
        })  


    
});
