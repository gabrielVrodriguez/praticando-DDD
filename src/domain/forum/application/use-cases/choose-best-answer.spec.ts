import { makeQuestion } from "test/factories/make-question";
import { ChooseBestAnswerUseCase } from "./choose-best-answer";
import { inMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { inMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeAnswer } from "test/factories/make-answer";



let answerRepository: inMemoryAnswersRepository;
let questionRepository: inMemoryQuestionsRepository;
let sut: ChooseBestAnswerUseCase;


describe('Choose Best Answer', () => {


    beforeEach(() => {
        answerRepository = new inMemoryAnswersRepository();
        questionRepository = new inMemoryQuestionsRepository();
        sut = new ChooseBestAnswerUseCase(answerRepository, questionRepository);
    })

    test('should be able to choose the best answer', async () => {

        const newQuestion = makeQuestion();
        const answer = makeAnswer({ questionId: newQuestion.id });

        await questionRepository.create(newQuestion);
        await answerRepository.create(answer);

        await sut.execute({ authorId: 'oi', answerId: answer.id.toString() });


        expect(newQuestion).toHaveProperty('bestAnswerId');
    })

    test('should not be able to choose the best answer', async () => {

        const newQuestion = makeQuestion();
        const answer = makeAnswer({ questionId: newQuestion.id });

        await questionRepository.create(newQuestion);
        await answerRepository.create(answer);

        expect(() =>
            sut.execute(
                {
                    authorId: answer.authorId.toString(),
                    answerId: answer.id.toString()
                })).rejects.toThrow("Not allowed to choose this answer as best");



    })
})


