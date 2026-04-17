import { inMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository';
import { deleteAnswerUseCase } from './delete-answer';

import { makeAnswer } from 'test/factories/make-answer';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

let answersRepository: inMemoryAnswersRepository;
let sut: deleteAnswerUseCase;


describe('delete a answer', () => {

    beforeEach(() => {
        answersRepository = new inMemoryAnswersRepository();
        sut = new deleteAnswerUseCase(answersRepository);
    })

    it('should be able to delete a answer', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-id'),
        })

        await answersRepository.create(newAnswer)

        const answer = await answersRepository.findById(newAnswer.id.toString());

        if (!answer) {
            throw new Error('Answer not found');
        }

        await sut.execute({answerId: answer.id.toString(), authorId: answer.authorId.toString()})

        expect(answersRepository.items).toHaveLength(0);

    })

     it('should not be able to delete a answer if the author is different', async () => {

        const newAnswer = makeAnswer({
            authorId: new UniqueEntityId('author-id'),
        })

        await answersRepository.create(newAnswer)

        await expect(() =>
            sut.execute({answerId: newAnswer.id.toString(), authorId: 'different-author-id'})
        ).rejects.toThrow("Not allowed to delete this answer");

        expect(answersRepository.items).toHaveLength(1);

    })
});
