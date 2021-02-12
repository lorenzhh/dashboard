import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { NotificationType } from 'app/shared/ui/notification/notification-type';

@Injectable()
export class NotificationService {
    constructor(readonly notificationsService: NotificationsService) {}

    showNotification(type: NotificationType, text: string, timeout = 3000) {
        switch (type) {
            case NotificationType.alert:
                this.notificationsService.alert('Alert', text, {
                    timeOut: timeout
                });
                break;
            case NotificationType.error:
                this.notificationsService.error('Fehler', text, {
                    timeOut: timeout
                });
                break;
            case NotificationType.info:
                this.notificationsService.info('Info', text, {
                    timeOut: timeout
                });
                break;
            case NotificationType.success:
                this.notificationsService.success('Success', text, {
                    timeOut: timeout
                });
                break;
            case NotificationType.warn:
                this.notificationsService.warn('Warning', text, {
                    timeOut: timeout
                });
                break;
            default:
                this.notificationsService.info('Info', text, {
                    timeOut: timeout
                });
        }
    }

    destroyNotification() {
        this.notificationsService.remove();
    }
}
