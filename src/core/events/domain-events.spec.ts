import { AggregateRoot } from "../entities/aggregate-root";
import type { UniqueEntityId } from "../entities/unique-entity-id";
import type { DomainEvent } from "./domain-event-interface";
import { DomainEvents } from "./domain-events";

class CustomAggregateCreated implements DomainEvent {
    public ocurredAt: Date
    private aggregate: CustomAggregate

    constructor(aggregate: CustomAggregate) {
        this.ocurredAt = new Date()
        this.aggregate = aggregate
    }

    public getAggregateId(): UniqueEntityId {
        return this.aggregate.id
    }
}

class CustomAggregate extends AggregateRoot<any> {

    static create() {
        const aggregate = new CustomAggregate()

        aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

        return aggregate
    }
}

describe('Domain Events', () => {

    it('should be able to dispatch and listen to events', () => {

        const callbackSpy = vi.fn(() => console.log("oi"))

        // Subscriber cadastrado (ouvindo o evento de "resposta criada")
        DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

        // Estou criando a resposta porém SEM salvar no banco
        const aggreagate = CustomAggregate.create()

        // Estou assegurando que o evento foi criado porém NÃO foi disparado
        expect(aggreagate.domainEvents).toHaveLength(1)

        // Estou salvando a resposta no banco de dados e assim disparando o evento
        DomainEvents.dispatchEventsForAggregate(aggreagate.id)

        // O subscriber ouve o evento e faz o que precisa ser feito com o dado
        expect(callbackSpy).toHaveBeenCalled()
        expect(aggreagate.domainEvents).toHaveLength(0)


    })
})