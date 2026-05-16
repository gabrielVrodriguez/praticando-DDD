


import { Notification } from "../../src/domain/notification/enterprise/entities/notification";
import type { NotificationsRepository } from "../../src/domain/notification/application/repositories/notification-repository";

export class InMemoryNotificationsRepository implements NotificationsRepository {

    public items: Notification[] = [];

    constructor() { }



    async create(notification: Notification): Promise<void> {
        this.items.push(notification);
    }

    async findById(id: string): Promise<Notification | null> {
        const notification = this.items.find(item => item.id.toString() === id);
        return notification ?? null;
    }

    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.items.findIndex(item => item.id === notification.id)

        this.items[notificationIndex] = notification;
    }








}