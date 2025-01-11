import { User, Event } from "@prisma/client";

export type FullEvent = Event & {
  producer: User
}