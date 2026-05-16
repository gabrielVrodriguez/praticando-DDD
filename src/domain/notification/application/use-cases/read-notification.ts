
import { left, right, type Either } from "@/core/either.js";
import { Notification } from "../../enterprise/entities/notification.js";
import type { NotificationsRepository } from "../repositories/notification-repository.js";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found.error.js";
import { NotAllowedError } from "@/core/errors/not-allowed.error.js";

interface ReadNotificationUseCaseRequest {
    notificationId: string
    recipientId: string;
}

type ReadNotificationUseCaseResponse =
 Either<ResourceNotFoundError | NotAllowedError, { notification: Notification }>;


export class ReadNotificationUseCase {


    constructor(private notificationRepository: NotificationsRepository) { }

    async execute({ notificationId, recipientId }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {

        const notification = await this.notificationRepository.findById(notificationId);

        if (!notification) {
            return left(new ResourceNotFoundError());
        }

        if (notification.recipientId.toString() !== recipientId) {
            return left(new NotAllowedError());
        }

        notification.read();

        await this.notificationRepository.save(notification);


        return right({ notification });
    }
}
