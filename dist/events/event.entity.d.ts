declare enum eventStatus {
    PENDING = "Pending",
    ACCEPTED = "Accepted",
    DECLINED = "Declined"
}
declare enum eventType {
    REOTEWORK = "RemoteWork",
    PAIDLEAVE = "PaidLeave"
}
export declare class User {
    id: string;
    date: Date;
    eventStatus: eventStatus[];
    eventType: eventType[];
    eventDescription?: string;
    userId: string;
}
export {};
