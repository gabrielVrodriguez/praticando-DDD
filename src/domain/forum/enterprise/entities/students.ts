
import { Entity } from "../../../../core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface StudentsProps {
    nome: string,
}

export class Students extends Entity<StudentsProps> {

    static create(props: StudentsProps, id?: UniqueEntityId) {
        const student = new Students(id, {
            ...props,
        });
        return student
    }

}