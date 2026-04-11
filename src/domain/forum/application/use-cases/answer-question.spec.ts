import { inMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository';
import { AnswerQuestionUseCase } from './answer-question';

let answersRepository: inMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('create an answer', () => {


    beforeEach(() => {
        answersRepository = new inMemoryAnswersRepository();
        sut = new AnswerQuestionUseCase(answersRepository);
    })

    it('should be able to create an answer', async () => {

        const { answer }  = await sut.execute({
            authorId: 'instructor-id',
            questionId: 'question-id',
            content: 'This is the content of the answer'
        });

        expect(answer.content).toBe('This is the content of the answer');
        expect(answer.id).toBeTruthy();
        expect(answersRepository.items[0]?.id).toEqual(answer.id);

    })
});
