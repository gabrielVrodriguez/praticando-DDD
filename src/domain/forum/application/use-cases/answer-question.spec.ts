import { InMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository';
import { AnswerQuestionUseCase } from './answer-question';
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments.repository";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: AnswerQuestionUseCase;

describe('create an answer', () => {


    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
        sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
    })

    it('should be able to create an answer', async () => {

        const answer = await sut.execute({
            authorId: 'instructor-id',
            questionId: 'question-id',
            content: 'This is the content of the answer',
            attachmentsIds: ['1', '2']
        });

        expect(answer.isRight()).toBe(true);
        expect(answer.value?.answer.id).toBeTruthy();
        expect(inMemoryAnswersRepository.items[0]?.id).toEqual(answer.value?.answer.id);

    })
});
