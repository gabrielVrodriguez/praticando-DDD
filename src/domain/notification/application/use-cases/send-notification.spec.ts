import  { InMemoryNotificationsRepository } from "test/repositories/in-memory-notifications.repository";
import  { SendNotificationUseCase } from "./send-notification";









let inMemoryNotificationsRepository: InMemoryNotificationsRepository;

let sut: SendNotificationUseCase;

describe('Send notification', () => {

    beforeEach(() => {
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository();

        sut = new SendNotificationUseCase(inMemoryNotificationsRepository);
    })

    it('should be able to create a notification', async () => {
 
        const result = await sut.execute({
            recipientId: 'instructor-id',
            title: 'new notification',
            content: 'This is the content of the notification',

        });

        expect(result.isRight()).toBe(true);
        expect(result.value?.notification.content).toBe('This is the content of the notification');

    })
});
