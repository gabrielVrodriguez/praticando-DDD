import { makeQuestion } from "test/factories/make-question";
import { ChooseBestAnswerUseCase } from "./choose-best-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeAnswer } from "test/factories/make-answer";
import { NotAllowedError } from "./errors/not-allowed.error";



let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: ChooseBestAnswerUseCase;


describe('Choose Best Answer', () => {


    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new ChooseBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository);
    })

    test('should be able to choose the best answer', async () => {

        const newQuestion = makeQuestion();
        const answer = makeAnswer({ questionId: newQuestion.id });

        await inMemoryQuestionsRepository.create(newQuestion);
        await inMemoryAnswersRepository.create(answer);

        const result = await sut.execute({ authorId: 'oi', answerId: answer.id.toString() });


        expect(result.isRight()).toBe(true);
    })

    test('should not be able to choose the best answer', async () => {

        const newQuestion = makeQuestion();
        const answer = makeAnswer({ questionId: newQuestion.id });

        await inMemoryQuestionsRepository.create(newQuestion);
        await inMemoryAnswersRepository.create(answer);

        const result = await sut.execute(
            {
                authorId: answer.authorId.toString(),
                answerId: answer.id.toString()
            })


        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(NotAllowedError);


    })
})


