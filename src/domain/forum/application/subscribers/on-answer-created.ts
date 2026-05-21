import { DomainEvents } from "@/core/events/domain-events";
import type { EventHandler } from "@/core/events/event-handler";
import { AnswerCreatedEvent } from "../../enterprise/entities/events/answer-created-event";
import type { QuestionsRepository } from "../repositories/questions-repository";
import type { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error";


export class OnAnswerCreated implements EventHandler {

    constructor(
        private questionsRepository: QuestionsRepository,
        private sendNotification: SendNotificationUseCase
    ) {
        this.setupSubscriptions();
    }


    setupSubscriptions(): void {
        DomainEvents.register(this.sendNewAnswerNotification.bind(this), AnswerCreatedEvent.name)
    }

    private async sendNewAnswerNotification({ answer, }: AnswerCreatedEvent) {
        const question = await this.questionsRepository.findById(answer.questionId.toString());

        if (!question) return ResourceNotFoundError

        await this.sendNotification.execute({
            title: "New answer posted",
            content: `A new answer was posted for your question "${question.title.substring(0,40).concat('...')}"`,
            recipientId: question.authorId.toString()
        })
    }



}