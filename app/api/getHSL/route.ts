import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import prand, { mersenne } from "pure-rand";
export async function GET(request: NextRequest) {
  const seed_salt = process.env.SEED_SALT;
  const date = new Date().toUTCString();
  const formattedDate = format(date, "yyyyMMdd");

  const seed = Number(formattedDate + seed_salt);

  const rng = mersenne(seed);

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
    },
    { status: 200 }
  );
}
