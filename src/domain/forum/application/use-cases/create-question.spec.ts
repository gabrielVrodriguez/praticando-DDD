import { AnswerQuestionUseCase } from './answer-question';
import type { QuestionRepository } from '../.././application/repositories/question-repository';
import type { Question } from '../../enterprise/entities/question';
import { createQuestionUseCase } from './create-question';


const fakeQuestionRepository: QuestionRepository = {
    async create(question: Question): Promise<void> {
        return;
    }
}

describe('create a question', () => {


    it('should be able to create a question', async () => {
        const createQuestion = new createQuestionUseCase(fakeQuestionRepository);

        const { question } = await createQuestion.execute({
            authorId: 'instructor-id',
            title: 'This is a question',
            content: 'This is the content of the question'
        });

        expect(question.content).toBe('This is the content of the question');

    })
});
