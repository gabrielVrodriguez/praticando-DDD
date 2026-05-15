import type { AnswersRepository } from "../repositories/answers-repository";
import { right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed.error";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import type { AnswerAttachmentsRepository } from "../repositories/answer-attachments.repository";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";

export interface editAnswerUseCaseRequest {
    authorId: string;
    questionId: string;
    content: string;
    attachmentsIds: string[];
}

export type editAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;


export class editAnswerUseCase {

    constructor(
        private answerRepository: AnswersRepository,
        private answerAttachmentRepository: AnswerAttachmentsRepository
    ) { }

    async execute({ authorId, questionId, content, attachmentsIds }: editAnswerUseCaseRequest): Promise<editAnswerUseCaseResponse> {

        const answer = await this.answerRepository.findById(questionId);

        if (!answer) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError());
        }

        const currentAnswerAttachments = await this.answerAttachmentRepository.findManyByAnswerId(answer.id.toString());

        const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments);

        const answerAttachments = attachmentsIds.map(attachmentId => {
            return AnswerAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                answerId: answer.id
            })
        })

        answerAttachmentList.update(answerAttachments);
        answer.attachments = answerAttachmentList;

        answer.content = content;

        await this.answerRepository.save(answer);

        return right({});
    }

}