import { InMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { getQuestionBySlugUseCase } from './get-question-by-slug';

import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: getQuestionBySlugUseCase;


describe('get a question by slug', () => {

    beforeEach(() => {
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
        sut = new getQuestionBySlugUseCase(inMemoryQuestionsRepository);
    })

    it('should be able to get a question by slug', async () => {

        const newQuestion = makeQuestion({
            slug: Slug.create('this-is-a-question')
        })

        // console.log(newQuestion)


        await inMemoryQuestionsRepository.create(newQuestion)

        const result = await sut.execute({ slug: newQuestion.slug.value })

        expect(result.isRight()).toBe(true);
    

    })
});
