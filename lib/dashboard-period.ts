import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subYears,
} from "date-fns";

import { fromZonedTime, toZonedTime } from "date-fns-tz";

export const DASHBOARD_TIMEZONE = "America/Sao_Paulo";

export const dashboardPeriods = [
  "today",
  "week",
  "month",
  "semester",
  "year",
  "fiveYears",
] as const;

export type DashboardPeriod = (typeof dashboardPeriods)[number];

export const dashboardPeriodLabels: Record<DashboardPeriod, string> = {
  today: "Hoje",
  week: "Esta semana",
  month: "Este mês",
  semester: "Este semestre",
  year: "Este ano",
  fiveYears: "Últimos 5 anos",
};

export type DashboardPeriodRange = {
  gte: Date;
  lte: Date;
};

export function getDashboardPeriodRange(
  period: DashboardPeriod,
  referenceDate = new Date(),
): DashboardPeriodRange {
  const dateInSaoPaulo = toZonedTime(referenceDate, DASHBOARD_TIMEZONE);

  switch (period) {
    case "today": {
      return {
        gte: fromZonedTime(startOfDay(dateInSaoPaulo), DASHBOARD_TIMEZONE),
        lte: fromZonedTime(endOfDay(dateInSaoPaulo), DASHBOARD_TIMEZONE),
      };
    }

    case "week": {
      return {
        gte: fromZonedTime(
          startOfWeek(dateInSaoPaulo, {
            weekStartsOn: 1,
          }),
          DASHBOARD_TIMEZONE,
        ),
        lte: fromZonedTime(
          endOfWeek(dateInSaoPaulo, {
            weekStartsOn: 1,
          }),
          DASHBOARD_TIMEZONE,
        ),
      };
    }

    case "month": {
      return {
        gte: fromZonedTime(startOfMonth(dateInSaoPaulo), DASHBOARD_TIMEZONE),
        lte: fromZonedTime(endOfMonth(dateInSaoPaulo), DASHBOARD_TIMEZONE),
      };
    }

    case "semester": {
      const month = dateInSaoPaulo.getMonth();
      const semesterStartMonth = month < 6 ? 0 : 6;

      const semesterStart = new Date(dateInSaoPaulo);
      semesterStart.setMonth(semesterStartMonth, 1);

      const semesterEnd = new Date(semesterStart);
      semesterEnd.setMonth(semesterStartMonth + 5);
      semesterEnd.setDate(1);

      return {
        gte: fromZonedTime(startOfMonth(semesterStart), DASHBOARD_TIMEZONE),
        lte: fromZonedTime(endOfMonth(semesterEnd), DASHBOARD_TIMEZONE),
      };
    }

    case "year": {
      return {
        gte: fromZonedTime(
          new Date(dateInSaoPaulo.getFullYear(), 0, 1),
          DASHBOARD_TIMEZONE,
        ),
        lte: fromZonedTime(
          new Date(dateInSaoPaulo.getFullYear(), 11, 31, 23, 59, 59, 999),
          DASHBOARD_TIMEZONE,
        ),
      };
    }

    case "fiveYears":
      return {
        gte: fromZonedTime(
          startOfDay(subYears(dateInSaoPaulo, 5)),
          DASHBOARD_TIMEZONE,
        ),
        lte: fromZonedTime(endOfDay(dateInSaoPaulo), DASHBOARD_TIMEZONE),
      };
  }
}
