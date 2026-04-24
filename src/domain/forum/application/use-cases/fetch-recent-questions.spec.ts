import { inMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { fetchRecentQuestionsUseCase } from './fetch-recent-questions';
import { makeQuestion } from 'test/factories/make-question';
import { Slug } from '../../enterprise/entities/value-objects/slug';

let questionsRepository: inMemoryQuestionsRepository;
let sut: fetchRecentQuestionsUseCase;


describe('fetch recent questions', () => {

    beforeEach(() => {
        questionsRepository = new inMemoryQuestionsRepository();
        sut = new fetchRecentQuestionsUseCase(questionsRepository);
    })

    it('should be able to fetch recent questions', async () => {

        const newQuestion = makeQuestion({
            slug: Slug.create('this-is-a-question')
        })

        await questionsRepository.create(newQuestion)

        const { questions } = await sut.execute({ page: 1 })

        expect(questions).toBeTruthy();
        expect(questions[0]?.authorId.toString()).toBe(newQuestion.authorId.toString());
    })

    it('should be able to fetch recent questions and sort them', async () => {

        await questionsRepository.create(makeQuestion({ createdAt: new Date(2025, 0, 20) }))
        await questionsRepository.create(makeQuestion({ createdAt: new Date(2025, 2, 20) }))
        await questionsRepository.create(makeQuestion({ createdAt: new Date(2026, 0, 20) }))
        await questionsRepository.create(makeQuestion({ createdAt: new Date(2027, 0, 20) }))
        await questionsRepository.create(makeQuestion({ createdAt: new Date(2028, 0, 20) }))


        const { questions } = await sut.execute({ page: 1 })

        if (!questions) {
            throw new Error("Questions not found");
        }

        expect(questions).toBeTruthy();
        expect(questions).toHaveLength(5);
        expect(questions[0]!.createdAt).toEqual(new Date(2028, 0, 20));
    })  


     it('should be able to fetch paginated recent questions ', async () => {

       for ( let i = 1; i<= 22; i ++) {
        await questionsRepository.create(makeQuestion({ createdAt: new Date(2025, 0, i) }))
       }


        const { questions } = await sut.execute({ page: 2 })

        if (!questions) {
            throw new Error("Questions not found");
        }

        expect(questions).toBeTruthy();
        expect(questions).toHaveLength(2);
    })  
});
