
import { Slug } from './value-objects/slug'
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import type { Optional } from '@/core/entities/types/optional';
import dayjs from 'dayjs';
import { AggregateRoot } from '@/core/entities/aggregate-root';
import type { QuestionAttachment } from './question-attachment';

export interface QuestionProps {
    authorId: UniqueEntityId,
    bestAnswerId?: UniqueEntityId,
    attachments: QuestionAttachment[],
    title: string,
    content: string,
    slug: Slug,
    createdAt: Date,
    updatedAt?: Date,
}

export class Question extends AggregateRoot<QuestionProps> {

    get authorId() {
        return this.props.authorId;
    }

    get attachments() {
        return this.props.attachments;
    }

    set attachments(attachments: QuestionAttachment[]) {
        this.props.attachments = attachments;
        this.touch();
    }

    get bestAnswerId() {
        return this.props.bestAnswerId;
    }

    set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
        if (bestAnswerId === undefined) {
            delete this.props.bestAnswerId;
        } else {
            this.props.bestAnswerId = bestAnswerId;
        }
        this.touch();
    }

    get title() {
        return this.props.title;
    }

    set title(title: string) {
        this.props.title = title;
        this.props.slug = Slug.createFromText(title);
        this.touch();
    }

    get content() {
        return this.props.content;
    }

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }

    get slug() {
        return this.props.slug;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    get isNew(): boolean {
        return dayjs().diff(this.createdAt, 'day') <= 3;
    }

    static create(props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>, id?: UniqueEntityId) {
        const question = new Question(id, {
            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            attachments: props.attachments ?? [],
            createdAt: props.createdAt ?? new Date()
        });
        return question
    }
}


