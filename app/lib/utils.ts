import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Event } from "@prisma/client"
import { EventSummary } from "@/types/event";
import { date2text } from "@/utils/date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function summarizeEvents(events: Event[]): EventSummary[] {
  const summ = events.map((event) => ({
    id: event.id.toString(),
    title: event.title,
    date: date2text(new Date(event.date)),
    soldTickets: -1
  }));
  return summ;
};