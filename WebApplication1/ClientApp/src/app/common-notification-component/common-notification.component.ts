import { Component, ElementRef } from '@angular/core';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';

@Component({
    selector: 'wp-common-notification',
    templateUrl: './common-notification.component.html',
    styleUrls: ['./common-notification.component.scss']
})
export class CommonNotificationComponent {

    //notificationMessage is used to, show notification message dialog box.
    notificationMessage: string;
    notificationError: boolean = false;
    notificationSuccess: boolean = false;
    notificationWarning: boolean = false;
    notificationInfo: boolean = false;
    showConsoleErrorMessage: boolean = false;
    isOutsideClickEnable: boolean = false;
    showUndo: boolean = false;
    undo: Observable<void>; //= this._undo.asObservable();

    private _afterClosed = new Subject<void>();
    private _undo = new Subject<void>();
    constructor(private _eref: ElementRef) {
        this.undo = this._undo.asObservable();
    }

    //This method used to close dialog box.
    close(): void {
        try {
            console.log("CommonNotificationComponent close - Started");
            this._afterClosed.next();
        } catch (err) {
            console.error(err);
        } finally {
            console.log("CommonNotificationComponent close - Ended");
        }
    }

    afterClosed(): Observable<void> {
        console.log("CommonNotificationComponent afterClosed - Started");
        try {
            return this._afterClosed.asObservable();
        } catch (err) {
            console.error(err);
        } finally {
            console.log("CommonNotificationComponent afterClosed - Ended");
        }
    }

    undoClick() {
        console.log("CommonNotificationComponent undoClick - Started");
        try {
            this._undo.next();
            this._undo.complete();
        } catch (err) {
            console.error(err);
        } finally {
            console.log("CommonNotificationComponent undoClick - Ended");
        }
    }
}
