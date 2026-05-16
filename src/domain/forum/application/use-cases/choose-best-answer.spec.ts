import { makeQuestion } from "test/factories/make-question";
import { ChooseBestAnswerUseCase } from "./choose-best-answer";
import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { makeAnswer } from "test/factories/make-answer";
import { NotAllowedError } from "../../../../core/errors/not-allowed.error";
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments.repository';
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments.repository";



let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: ChooseBestAnswerUseCase;


describe('Choose Best Answer', () => {


    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
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


