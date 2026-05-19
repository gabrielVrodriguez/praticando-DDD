import type { DomainEvent } from "@/core/events/domain-event-interface";
import type { Answer } from "../answer";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";


export class AnswerCreatedEvent implements DomainEvent {

    public answer: Answer
    public ocurredAt: Date


    constructor(answer: Answer){
        this.answer = answer
        this.ocurredAt = new Date()
    }

    getAggregateId(): UniqueEntityId {
        return this.answer.id
    }

}