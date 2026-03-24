
import crypto from 'node:crypto';

export class Question {
    public id: string;
    public title: string;
    public content: string;

    constructor(title: string, content: string, id?: string) {
        this.id = id ?? crypto.randomUUID();
        this.title = title;
        this.content = content;
    }
}
