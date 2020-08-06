import { Severity } from "./enum";

export interface INotificationOptions {
    severity: Severity;
    outsideClickClose?: boolean;
    closeTimeOut?: number;
}
