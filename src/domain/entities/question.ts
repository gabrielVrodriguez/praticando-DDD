
import crypto from 'node:crypto';
import { Slug } from '../entities/value-objects/slug'

interface QuestionProps {
    title: string, 
    content: string, 
    slug: Slug,
    authorId: string,
}

export class Question {
    public id: string;
    public title: string;
    public content: string;
    public slug: Slug;
    public authorId: string;

    constructor(props: QuestionProps, id?: string) {
        this.id = id ?? crypto.randomUUID();
        this.title = props.title;
        this.content = props.content;
        this.slug = props.slug;
        this.authorId = props.authorId;
    }
}
