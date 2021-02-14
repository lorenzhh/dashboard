import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { NotificationType } from 'app/shared/ui/notification/notification-type';
import { NotificationService } from 'app/shared/ui/notification/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private notificationService: NotificationService, private zone: NgZone) {}

    public handleError(error: Error): void {
        if (error instanceof HttpErrorResponse) {
            return this.notifyError(error.statusText);
        }
        return this.notifyError(error.message);
    }

    private notifyError(message: string): void {
        this.zone.run(() => {
            this.notificationService.showNotification(NotificationType.error, message);
        });
    }
}
