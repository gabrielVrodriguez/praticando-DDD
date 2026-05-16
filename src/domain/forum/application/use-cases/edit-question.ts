import type { QuestionsRepository } from "../repositories/questions-repository";
import { right, left, type Either } from "@/core/either.js";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found.error";
import { NotAllowedError } from "../../../../core/errors/not-allowed.error";
import type { QuestionAttachmentsRepository } from "../repositories/question-attachments.repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";


export interface EditQuestionUseCaseRequest {
    authorId: string;
    questionId: string;
    title: string;
    content: string;
    attachmentsIds: string[];
}

export type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>;




export class EditQuestionUseCase {

    constructor(
        private questionRepository: QuestionsRepository,
        private questionAttachmentRepository: QuestionAttachmentsRepository
    ) { }

    async execute({ questionId, authorId, title, content, attachmentsIds
    }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError());
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError());
        }

        const currentQuestionAttachments = await this.questionAttachmentRepository.findManyByQuestionId(questionId);

        const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments);

        const questionAttachments = attachmentsIds.map(attachmentId => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityId(attachmentId),
                questionId: question.id
            })
        })

        questionAttachmentList.update(questionAttachments);
        question.attachments = questionAttachmentList;

        question.title = title;
        question.content = content;

        await this.questionRepository.save(question);

        return right({});
    }

}