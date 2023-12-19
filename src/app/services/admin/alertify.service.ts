import { Injectable } from '@angular/core';
import { AlertifyOptions } from 'src/app/contracts/serviceOptions/alertify';

declare var alertify: any;
@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  message(message: string, alertifyOptions: Partial<AlertifyOptions>) {
    var msg = alertify[alertifyOptions.messageType](message); // ! alertify.success() yapacagimiza --> js sayesinde alertify["success"] yaparak sinifin indexer ozelligi ile oradaki ney ise onu cagirabiliyoruz.
    if (alertifyOptions.dismissOthers) {
      // tetiklendiğinde anında o alertify'i dismiss yapıyor
      msg.dismissOthers();
    }
    alertify.set('notifier', 'position', alertifyOptions.messagePosition);
    alertify.set('notifier', 'delay', alertifyOptions.delay);
  }

  dismissAll() {
    alertify.dismissAll();
  }
}
