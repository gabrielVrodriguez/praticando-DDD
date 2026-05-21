import { DomainEvents } from "@/core/events/domain-events";
import type { EventHandler } from "@/core/events/event-handler";
import type { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";
import type { AnswersRepository } from "../repositories/answers-repository";
import { QuestionBestAnswerChosenEvent } from "../../enterprise/entities/events/question-best-answer-chosen-event";


export class OnQuestionBestAnswerChosen implements EventHandler {

    constructor(
        private answersRepository: AnswersRepository,
        private sendNotification: SendNotificationUseCase
    ) {
        this.setupSubscriptions();
    }


    setupSubscriptions(): void {
        DomainEvents.register(this.sendQuestionBestAnswerNotification.bind(this), QuestionBestAnswerChosenEvent.name)
    }

    private async sendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChosenEvent) {
         const answer = await this.answersRepository.findById(bestAnswerId.toString());

         if (!answer) return ResourceNotFoundError

        await this.sendNotification.execute({
            title: "Congratulations! Your answer has been chosen as the best answer",
            content: ` The answewr that you sent to "${question.title.substring(0,15).concat('...')} has been chosen by the author"`,
            recipientId: answer.authorId.toString()
        })
    }



}