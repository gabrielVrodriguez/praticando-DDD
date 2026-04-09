import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { Optional } from '@/core/entities/types/optional';
import { Entity } from "../../../../core/entities/entity";

interface InstructorProps {
    nome: string,
}

export class Instructor extends Entity<InstructorProps> {
    get nome() {
        return this.props.nome;
    }

    static create(props: InstructorProps, id?: UniqueEntityId) {
        const instructor = new Instructor(id, {
            ...props,
        });
        return instructor
    }

}