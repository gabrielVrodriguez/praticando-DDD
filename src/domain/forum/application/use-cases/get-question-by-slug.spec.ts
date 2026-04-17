import { inMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { getQuestionBySlugUseCase } from './get-question-by-slug';

import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

let questionsRepository: inMemoryQuestionsRepository;
let sut: getQuestionBySlugUseCase;


describe('get a question by slug', () => {

    beforeEach(() => {
        questionsRepository = new inMemoryQuestionsRepository();
        sut = new getQuestionBySlugUseCase(questionsRepository);
    })

    it('should be able to get a question by slug', async () => {

        const newQuestion = makeQuestion({
            slug: Slug.create('this-is-a-question')
        })

        // console.log(newQuestion)


        await questionsRepository.create(newQuestion)

        const { question } = await sut.execute({ slug: newQuestion.slug.value })

        expect(question.slug.value).toBe('this-is-a-question');
        expect(question.id).toBeTruthy();

    })
});
