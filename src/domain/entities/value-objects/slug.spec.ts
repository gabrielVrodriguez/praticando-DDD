

import { describe, test, expect } from 'vitest';
import { Slug } from './slug';



test('it should be able to create a slug from text', () =>{
        const text = 'This is a question title';
        const slug = Slug.createFromText(text);

        expect(slug.value).toBe('this-is-a-question-title');
}) 
