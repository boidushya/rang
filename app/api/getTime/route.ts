import { NextRequest, NextResponse } from "next/server";
import prand, { mersenne } from "pure-rand";

function getDateDifference(startDate: Date, endDate: Date) {
  const oneDay = 1000 * 60 * 60 * 24;

  const start = startDate.getTime();
  const end = endDate.getTime();

  const difference = end - start;

  return Math.floor(difference / oneDay);
}

const getFormattedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}${month}${day}`;
};

const getTodayInUTC = () => {
  const now = new Date();
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
};

export async function GET(request: NextRequest) {
  const date = getTodayInUTC();
  const formattedDate = getFormattedDate(date);

  const startDate = new Date(Date.UTC(2024, 1, 19));
  const edition = getDateDifference(startDate, getTodayInUTC()) + 1;

  const mid = getTodayInUTC();
  mid.setUTCHours(24, 0, 0, 0);

  const timeToNextEdition = (mid.getTime() - date.getTime()) / (1000 * 60 * 60);

  return NextResponse.json(
    {
      edition,
      date,
      formattedDate,
      timeToNextEdition,
    },
    { status: 200 }
  );
}
