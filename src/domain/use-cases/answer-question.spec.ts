import { it, expect, describe } from 'vitest';
import { AnswerQuestion } from './answer-question';



describe('create an answer', () => {

    it('should be able to create an answer', () => {
        const answerQuestion = new AnswerQuestion();

        const answer = answerQuestion.execute({
            questionId: 'question-id',
            content: 'This is an answer',
            instructorId: 'instructor-id'
        });

        expect(answer.content).toBe('This is an answer');

    })
});
