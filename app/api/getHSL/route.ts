import { NextRequest, NextResponse } from "next/server";
import prand, { mersenne } from "pure-rand";

function getDateDifference(startDate: Date, endDate: Date) {
  const oneDay = 1000 * 60 * 60 * 24;

  const start = Date.UTC(
    endDate.getUTCFullYear(),
    endDate.getUTCMonth(),
    endDate.getUTCDate()
  );
  const end = Date.UTC(
    startDate.getUTCFullYear(),
    startDate.getUTCMonth(),
    startDate.getUTCDate()
  );

  return (start - end) / oneDay;
}

const getUniformDate = (date: Date) => {
  const uniformDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  );

  return uniformDate;
};

const getFormattedDate = (date: Date): string => {
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");

  return `${year}${month}${day}`;
};

export async function GET(request: NextRequest) {
  const seed_salt = process.env.SEED_SALT;
  const date = getUniformDate(new Date());
  const formattedDate = getFormattedDate(date);

  const seed = Number(formattedDate + seed_salt);

  const rng = mersenne(seed);

  const startDate = new Date(2024, 1, 19);
  const edition =
    getDateDifference(getUniformDate(startDate), getUniformDate(new Date())) +
    1;

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
