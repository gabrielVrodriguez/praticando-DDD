import crypto from 'crypto';
import { UniqueEntityId } from './unique-entity-id';

export abstract class Entity<Props> {

    private _id: UniqueEntityId;
    protected props: Props;

    get id() {
        return this._id;
    }

    protected constructor(id?: UniqueEntityId, props?: any) {
        this._id = id ?? new UniqueEntityId();
        this.props = props;

    }

    public equals(entity: Entity<any>): boolean {
        if (entity === this) true

        if (entity.id === this.id) {
            return true
        }

        return false

    }

}