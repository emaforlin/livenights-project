import { ProducerType } from "./producer";

export type EventType = {
    id: number;
    uid: string
    title: string;
    description: string;
    date: Date;
    location: string;
    producer: ProducerType
}