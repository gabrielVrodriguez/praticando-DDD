import { makeAnswer } from "test/factories/make-answer";
import { makeQuestion } from "test/factories/make-question";

import { InMemoryAnswersRepository } from "test/repositories/in-memory-answers-repository";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/in-memory-answer-attachments.repository";
import { InMemoryQuestionsRepository } from "test/repositories/in-memory-questions-repository";
import { InMemoryQuestionAttachmentsRepository } from "test/repositories/in-memory-question-attachments.repository";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications.repository";
import { waitFor } from "test/utils/wait-for";
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-chosen";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryNotificationRepository: InMemoryNotificationsRepository;
let sut: SendNotificationUseCase;

let sendNotificationExecuteSpy: ReturnType<typeof vi.spyOn>;
describe('On Answer Created', () => {

    beforeEach(() => {
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository);
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository);
        inMemoryNotificationRepository = new InMemoryNotificationsRepository();
        sut = new SendNotificationUseCase(inMemoryNotificationRepository);

        sendNotificationExecuteSpy = vi.spyOn(sut, 'execute');
        new OnQuestionBestAnswerChosen(inMemoryAnswersRepository, sut);
    })

    it('should send a notification when a question has a new best answer chosen ', async () => {

        const question = makeQuestion();
        const answer = makeAnswer({ questionId: question.id });

        inMemoryQuestionsRepository.create(question);
        inMemoryAnswersRepository.create(answer);

        question.bestAnswerId = answer.id

        inMemoryQuestionsRepository.save(question)
        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled()
        })
    })
})