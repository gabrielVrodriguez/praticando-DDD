
import crypto from 'node:crypto';

export class Students{
    public id: string;
    public nome: string;

    constructor(nome: string, id?: string) {
        this.id = id ?? crypto.randomUUID();
        this.nome = nome;
    }
}