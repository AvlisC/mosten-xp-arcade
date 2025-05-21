
import { Event, CalendarCheckIn } from "../types";

export const events: Event[] = [
  {
    id: "event1",
    name: "Workshop de Segurança",
    description: "Workshop sobre práticas de segurança no ambiente de trabalho",
    date: "2024-05-25",
    endDate: "2024-05-25", // Single day event
    codes: ["WS2405-001", "WS2405-002", "WS2405-003"],
    createdBy: "cipa1",
    createdAt: "2024-05-10"
  },
  {
    id: "event2",
    name: "Treinamento de Primeiros Socorros",
    description: "Treinamento básico de primeiros socorros para todos os colaboradores",
    date: "2024-06-10",
    endDate: "2024-06-12", // Multi-day event
    codes: ["PS1006-001", "PS1006-002", "PS1006-003", "PS1006-004"],
    createdBy: "cipa1",
    createdAt: "2024-05-15"
  }
];

export const checkInCalendar: CalendarCheckIn[] = [
  { date: "2024-05-01", checked: true },
  { date: "2024-05-02", checked: true },
  { date: "2024-05-03", checked: true },
  { date: "2024-05-06", checked: true },
  { date: "2024-05-07", checked: true },
  { date: "2024-05-08", checked: true },
  { date: "2024-05-09", checked: true },
  { date: "2024-05-10", checked: false },
  { date: "2024-05-13", checked: true },
  { date: "2024-05-14", checked: true },
  { date: "2024-05-15", checked: true },
  { date: "2024-05-16", checked: true },
  { date: "2024-05-17", checked: true },
  { date: "2024-05-20", checked: true },
  { date: "2024-05-21", checked: true }
];
