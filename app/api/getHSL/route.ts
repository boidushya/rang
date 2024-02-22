import { NextRequest, NextResponse } from "next/server";
import prand, { mersenne } from "pure-rand";

export const dynamic = "force-dynamic";

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
  const seed_salt = process.env.SEED_SALT;
  const date = getTodayInUTC();
  const formattedDate = getFormattedDate(date);

  const seed = Number(formattedDate + seed_salt);

  const rng = mersenne(seed);

  const startDate = new Date(Date.UTC(2024, 1, 19));
  const edition = getDateDifference(startDate, getTodayInUTC()) + 1;

  const h = prand.unsafeUniformIntDistribution(0, 360, rng);
  const s = prand.unsafeUniformIntDistribution(0, 100, rng);
  const l = prand.unsafeUniformIntDistribution(0, 100, rng);

  const hsl = {
    h,
    s,
    l,
  };

  return NextResponse.json(
    {
      ...hsl,
      edition,
    },
    { status: 200 }
  );
}
