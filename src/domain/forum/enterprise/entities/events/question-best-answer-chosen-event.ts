import type { DomainEvent } from "@/core/events/domain-event-interface";
import type { Answer } from "../answer";
import type { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { Question } from "../question";


export class QuestionBestAnswerChosenEvent implements DomainEvent {

    public question: Question
    public bestAnswerId: UniqueEntityId
    public ocurredAt: Date
    


    constructor(question: Question, bestAnswerId: UniqueEntityId){
        this.question = question
        this.bestAnswerId = bestAnswerId
        this.ocurredAt = new Date()
        
    }

    getAggregateId(): UniqueEntityId {
        return this.question.id
    }

}