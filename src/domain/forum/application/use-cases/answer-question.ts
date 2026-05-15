
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js';
import { Answer } from '../../enterprise/entities/answer.js';
import type { AnswersRepository } from '../repositories/answers-repository.js';
import { right, type Either } from '@/core/either.js';
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list.js';
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment.js';


interface AnswerQuestionUseCaseRequest {
    questionId: string;
    content: string;
    authorId: string;
    attachmentsIds: string[];
}

type AnswerQuestionUseCaseResponse = Either<null, { answer: Answer }>;

export class AnswerQuestionUseCase {

    constructor(
        private answersRepository: AnswersRepository
    ) { }

    async execute({ questionId, content, authorId, attachmentsIds }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {

        const answer = Answer.create({
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
            content
        });

        const answerAttachments = attachmentsIds.map(attachmentId => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                answerId: answer.id
            })
        })

        answer.attachments = new AnswerAttachmentList(answerAttachments);

        await this.answersRepository.create(answer);

        return right({ answer });
    }
}