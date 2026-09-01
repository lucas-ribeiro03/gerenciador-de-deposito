import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
} from "date-fns";

import { fromZonedTime, toZonedTime } from "date-fns-tz";

export type OrderPeriod = "today" | "yesterday" | "week" | "month";

const TIMEZONE = "America/Sao_Paulo";

export function getOrderPeriodRange(
  period: OrderPeriod,
  referenceDate = new Date(),
) {
  const dateInSaoPaulo = toZonedTime(referenceDate, TIMEZONE);

  switch (period) {
    case "yesterday": {
      const yesterday = subDays(dateInSaoPaulo, 1);

      return {
        gte: fromZonedTime(startOfDay(yesterday), TIMEZONE),
        lte: fromZonedTime(endOfDay(yesterday), TIMEZONE),
      };
    }

    case "week": {
      return {
        gte: fromZonedTime(
          startOfWeek(dateInSaoPaulo, {
            weekStartsOn: 1,
          }),
          TIMEZONE,
        ),
        lte: fromZonedTime(
          endOfWeek(dateInSaoPaulo, {
            weekStartsOn: 1,
          }),
          TIMEZONE,
        ),
      };
    }

    case "month": {
      return {
        gte: fromZonedTime(startOfMonth(dateInSaoPaulo), TIMEZONE),
        lte: fromZonedTime(endOfMonth(dateInSaoPaulo), TIMEZONE),
      };
    }

    case "today":
    default: {
      return {
        gte: fromZonedTime(startOfDay(dateInSaoPaulo), TIMEZONE),
        lte: fromZonedTime(endOfDay(dateInSaoPaulo), TIMEZONE),
      };
    }
  }
}
