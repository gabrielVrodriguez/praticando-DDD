import { InMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository';
import { editAnswerUseCase } from './edit-answer';

import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: editAnswerUseCase;


describe('edit a answer', () => {

    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository();
        sut = new editAnswerUseCase(inMemoryAnswersRepository);
    })

    it('should be able to edit a answer', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryAnswersRepository.create(newAnswer)

        const answer = await inMemoryAnswersRepository.findById(newAnswer.id.toString());

        if (!answer) {
            throw new Error('Answer not found');
        }

        await sut.execute({
            questionId: newAnswer.id.toString(),
            authorId: newAnswer.authorId.toString(),
            content: 'New Content'
        })

        expect(answer.content).toBe('New Content');

    })

     it('should not be able to edit a answer if the author is different', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-id'),
        })

        await inMemoryAnswersRepository.create(newAnswer)

        await expect(() =>
            sut.execute({
                questionId: newAnswer.id.toString(),
                authorId: 'different-author-id',
                content: 'New Content'
            })
        ).rejects.toThrow("Not allowed to edit this answer");

        expect(inMemoryAnswersRepository.items).toHaveLength(1);

    })
});
