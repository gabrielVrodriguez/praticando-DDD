import { inMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository';
import { getQuestionBySlugUseCase } from './get-question-by-slug';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';

let questionsRepository: inMemoryQuestionsRepository;
let sut: getQuestionBySlugUseCase;

describe('get a question by slug', () => {

    beforeEach(() => {
        questionsRepository = new inMemoryQuestionsRepository();
        sut = new getQuestionBySlugUseCase(questionsRepository);
    })

    it('should be able to get a question by slug', async () => {

        const newQuestion = Question.create({
            authorId: new UniqueEntityId(),
            title: 'This is a question',
            content: 'This is the content of the question',
        })

        await questionsRepository.create(newQuestion)

        const { question } = await sut.execute({ slug: newQuestion.slug.value })

        expect(question.slug.value).toBe(newQuestion.slug.value);
        expect(question.id).toBeTruthy();

    })
});
