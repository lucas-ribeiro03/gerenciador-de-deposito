import {
  addHours,
  addMonths,
  eachDayOfInterval,
  eachMonthOfInterval,
  endOfDay,
  endOfHour,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfHour,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import { ptBR } from "date-fns/locale";

import { fromZonedTime, toZonedTime } from "date-fns-tz";

import {
  DASHBOARD_TIMEZONE,
  getDashboardPeriodRange,
  type DashboardPeriod,
  type DashboardPeriodRange,
} from "@/lib/dashboard-period";

export type DashboardEvolutionBucket = DashboardPeriodRange & {
  label: string;
};

export function getDashboardEvolutionBuckets(
  period: DashboardPeriod,
  referenceDate = new Date(),
  activeHours: Date[] = [],
): DashboardEvolutionBucket[] {
  const dateInSaoPaulo = toZonedTime(referenceDate, DASHBOARD_TIMEZONE);

  switch (period) {
    case "today":
      return getTodayBuckets(activeHours);

    case "week":
      return getWeekBuckets(dateInSaoPaulo);

    case "month":
      return getMonthBuckets(dateInSaoPaulo);

    case "semester":
      return getSemesterBuckets(dateInSaoPaulo);

    case "year":
      return getYearBuckets(dateInSaoPaulo);

    case "fiveYears":
      return getFiveYearsBuckets(dateInSaoPaulo);
  }
}

function getTodayBuckets(activeHours: Date[]): DashboardEvolutionBucket[] {
  if (activeHours.length === 0) {
    return [];
  }

  const normalizedHours = normalizeActiveHours(activeHours);

  const blocks = splitIntoActivityBlocks(normalizedHours);

  return blocks.flatMap((block) => {
    const firstHour = block[0];
    const lastHour = block[block.length - 1];

    const buckets: DashboardEvolutionBucket[] = [];

    let currentHour = startOfHour(firstHour);

    const lastHourStart = startOfHour(lastHour);

    while (currentHour <= lastHourStart) {
      buckets.push({
        gte: fromZonedTime(startOfHour(currentHour), DASHBOARD_TIMEZONE),

        lte: fromZonedTime(endOfHour(currentHour), DASHBOARD_TIMEZONE),

        label: format(currentHour, "HH'h'"),
      });

      currentHour = addHours(currentHour, 1);
    }

    return buckets;
  });
}

function normalizeActiveHours(activeHours: Date[]): Date[] {
  const uniqueHours = new Map<string, Date>();

  for (const activeHour of activeHours) {
    const dateInSaoPaulo = toZonedTime(activeHour, DASHBOARD_TIMEZONE);

    const hour = startOfHour(dateInSaoPaulo);

    const key = [
      hour.getFullYear(),
      hour.getMonth(),
      hour.getDate(),
      hour.getHours(),
    ].join("-");

    uniqueHours.set(key, hour);
  }

  return Array.from(uniqueHours.values()).sort(
    (a, b) => a.getTime() - b.getTime(),
  );
}

function splitIntoActivityBlocks(hours: Date[]): Date[][] {
  if (hours.length === 0) {
    return [];
  }

  const blocks: Date[][] = [];

  let currentBlock: Date[] = [hours[0]];

  for (let index = 1; index < hours.length; index++) {
    const previousHour = hours[index - 1];
    const currentHour = hours[index];

    const differenceInHours =
      (currentHour.getTime() - previousHour.getTime()) / (1000 * 60 * 60);

    if (differenceInHours >= 4) {
      blocks.push(currentBlock);

      currentBlock = [];
    }

    currentBlock.push(currentHour);
  }

  blocks.push(currentBlock);

  return blocks;
}

function getWeekBuckets(date: Date): DashboardEvolutionBucket[] {
  const start = startOfWeek(date, {
    weekStartsOn: 1,
  });

  const end = endOfWeek(date, {
    weekStartsOn: 1,
  });

  return eachDayOfInterval({
    start,
    end,
  }).map((day) => ({
    gte: fromZonedTime(startOfDay(day), DASHBOARD_TIMEZONE),

    lte: fromZonedTime(endOfDay(day), DASHBOARD_TIMEZONE),

    label: capitalize(
      format(day, "EEE", {
        locale: ptBR,
      }).replace(".", ""),
    ),
  }));
}

function getMonthBuckets(date: Date): DashboardEvolutionBucket[] {
  const range = getDashboardPeriodRange("month", date);

  const monthStart = toZonedTime(range.gte, DASHBOARD_TIMEZONE);

  const monthEnd = toZonedTime(range.lte, DASHBOARD_TIMEZONE);

  const firstWeekStart = startOfWeek(monthStart, {
    weekStartsOn: 1,
  });

  const lastWeekStart = startOfWeek(monthEnd, {
    weekStartsOn: 1,
  });

  const weekStarts = eachDayOfInterval({
    start: firstWeekStart,
    end: lastWeekStart,
  }).filter((day) => day.getDay() === 1);

  return weekStarts.map((weekStart, index) => {
    const weekEnd = endOfWeek(weekStart, {
      weekStartsOn: 1,
    });

    const boundedStart =
      weekStart < monthStart ? startOfDay(monthStart) : startOfDay(weekStart);

    const boundedEnd =
      weekEnd > monthEnd ? endOfDay(monthEnd) : endOfDay(weekEnd);

    return {
      gte: fromZonedTime(boundedStart, DASHBOARD_TIMEZONE),

      lte: fromZonedTime(boundedEnd, DASHBOARD_TIMEZONE),

      label: `Semana ${index + 1}`,
    };
  });
}

function getSemesterBuckets(date: Date): DashboardEvolutionBucket[] {
  const range = getDashboardPeriodRange("semester", date);

  const start = toZonedTime(range.gte, DASHBOARD_TIMEZONE);

  const end = toZonedTime(range.lte, DASHBOARD_TIMEZONE);

  return eachMonthOfInterval({
    start,
    end,
  }).map((month) => ({
    gte: fromZonedTime(startOfMonth(month), DASHBOARD_TIMEZONE),

    lte: fromZonedTime(endOfMonth(month), DASHBOARD_TIMEZONE),

    label: capitalize(
      format(month, "MMM", {
        locale: ptBR,
      }).replace(".", ""),
    ),
  }));
}

function getYearBuckets(date: Date): DashboardEvolutionBucket[] {
  const range = getDashboardPeriodRange("year", date);

  const start = toZonedTime(range.gte, DASHBOARD_TIMEZONE);

  const end = toZonedTime(range.lte, DASHBOARD_TIMEZONE);

  return eachMonthOfInterval({
    start,
    end,
  }).map((month) => ({
    gte: fromZonedTime(startOfMonth(month), DASHBOARD_TIMEZONE),

    lte: fromZonedTime(endOfMonth(month), DASHBOARD_TIMEZONE),

    label: capitalize(
      format(month, "MMM", {
        locale: ptBR,
      }).replace(".", ""),
    ),
  }));
}

function getFiveYearsBuckets(date: Date): DashboardEvolutionBucket[] {
  const range = getDashboardPeriodRange("fiveYears", date);

  const rangeStart = toZonedTime(range.gte, DASHBOARD_TIMEZONE);

  const rangeEnd = toZonedTime(range.lte, DASHBOARD_TIMEZONE);

  const currentSemesterStartMonth = date.getMonth() < 6 ? 0 : 6;

  const currentSemesterStart = new Date(
    date.getFullYear(),
    currentSemesterStartMonth,
    1,
  );

  const firstSemesterStart = new Date(currentSemesterStart);

  firstSemesterStart.setFullYear(firstSemesterStart.getFullYear() - 5);

  const buckets: DashboardEvolutionBucket[] = [];

  let current = firstSemesterStart;

  for (let index = 0; index < 10; index++) {
    const nextSemester = addMonths(current, 6);

    const semesterEnd = new Date(nextSemester);

    semesterEnd.setDate(0);

    const boundedStart = current < rangeStart ? rangeStart : current;

    const boundedEnd = semesterEnd > rangeEnd ? rangeEnd : semesterEnd;

    const semester = current.getMonth() < 6 ? "H1" : "H2";

    buckets.push({
      gte: fromZonedTime(startOfMonth(boundedStart), DASHBOARD_TIMEZONE),

      lte: fromZonedTime(endOfMonth(boundedEnd), DASHBOARD_TIMEZONE),

      label: `${current.getFullYear()} ${semester}`,
    });

    current = nextSemester;
  }

  return buckets;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
