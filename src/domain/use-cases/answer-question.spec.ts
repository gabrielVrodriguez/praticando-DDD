import { AnswerQuestionUseCase } from './answer-question';
import type { AnswersRepository } from '../repositories/answer-repository';
import type { Answer } from '../entities/answer';


const fakeAnswersRepository: AnswersRepository = {
    async create(answer: Answer): Promise<void> {
        return;
    }
}

describe('create an answer', () => {

  
    it('should be able to create an answer', async () => {
        const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

        const answer = await answerQuestion.execute({
            questionId: 'question-id',
            content: 'This is an answer',
            authorId: 'instructor-id'
        });

        expect(answer.content).toBe('This is an answer');

    })
});
