
export class Slug {
    public value: string;

    private constructor(value: string) {
        this.value = value;
    }

    static create(slug: string): Slug {
        return new Slug(slug);
    }

    static createFromText(text: string): Slug {
        const slug = text
            .normalize('NFKD')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+ $/g, '');       
        return new Slug(slug);
        
    }}