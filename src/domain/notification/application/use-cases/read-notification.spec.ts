import  { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications.repository";
import { ReadNotificationUseCase } from "./read-notification";
import { makeNotification } from "test/factories/make-notification";
import { NotAllowedError } from "@/core/errors/not-allowed.error";








let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase;

describe('Read notification', () => {

    beforeEach(() => {
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
        sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
    })

    it('should be able to read a notification', async () => {
        
        const notification = makeNotification()

        await inMemoryNotificationsRepository.create(notification)


        const result = await sut.execute({
            notificationId: notification.id.toString(),
            recipientId: notification.recipientId.toString(),

        });

        expect(result.isRight()).toBe(true);
        expect(inMemoryNotificationsRepository.items).toHaveLength(1);
        expect(inMemoryNotificationsRepository.items[0]!.readAt).toEqual(expect.any(Date));

    })

     it('should not be able to read a notification if the recipient is different', async () => {
    
            const newNotification = makeNotification()
    
            await inMemoryNotificationsRepository.create(newNotification)
    
            const result = await sut.execute({ notificationId: newNotification.id.toString(), recipientId: 'different-recipient-id' })
    
            expect(result.isLeft()).toBe(true);
            expect(result.value).toBeInstanceOf(NotAllowedError);
    
        })
});
