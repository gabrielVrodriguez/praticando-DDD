import crypto from 'node:crypto';

export class Answer {
    public id: string;
    public content: string;

    constructor(content: string, id?: string) {
        this.id = id ?? crypto.randomUUID();
        this.content = content;
    }
}