import { NextResponse, NextRequest } from "next/server";

export interface DataPoints {
  month: number;
  year: number;
  value: number;
}

export interface BrandData {
  brand: string;
  data: DataPoints[];
}

export interface DataResponse {
  data: BrandData[];
  fromYear: number;
  toYear: number;
  highValue: number;
  fromMonth: number;
  toMonth: number;
}

const randomData = (
  fromYear: number,
  toYear: number,
  fromMonth: number = 1,
  toMonth: number = 12,
  highValue: number
): DataResponse => {
  const brands = [
    "Cliveden House",
    "Chewton Glen",
    "The Grove",
    "Gleneagles",
    "Old Course Hotel",
    "Beaverbrook Hotel",
    "Dameren House",
    "Coworth Park",
    "Four Seasons Hampshire",
    "The Newt",
  ];

  const data: BrandData[] = brands.map((brand) => {
    const dataPoints: DataPoints[] = [];
    for (let year = fromYear; year <= toYear; year++) {
      const startMonth = year === fromYear ? fromMonth : 1;
      const endMonth = year === toYear ? toMonth : 12;
      for (let month = startMonth; month <= endMonth; month++) {
        dataPoints.push({
          month,
          year,
          value: Math.floor(Math.random() * highValue),
        });
      }
    }
    return { brand, data: dataPoints };
  });
  return {
    data,
    fromYear,
    toYear,
    highValue,
    fromMonth,
    toMonth,
  };
};

export async function GET(NextRequest: NextRequest) {
  try {
    const fromYear: number = parseInt(
      NextRequest.nextUrl.searchParams.get("fromYear") || "2010"
    );
    const toYear: number = parseInt(
      NextRequest.nextUrl.searchParams.get("toYear") || "2015"
    );
    const highValue: number = parseInt(
      NextRequest.nextUrl.searchParams.get("highValue") || "100"
    );
    const fromMonth: number = parseInt(
      NextRequest.nextUrl.searchParams.get("fromMonth") || "1"
    );
    const toMonth: number = parseInt(
      NextRequest.nextUrl.searchParams.get("toMonth") || "12"
    );

    const data = randomData(fromYear, toYear, fromMonth, toMonth, highValue);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating random data:", error);
    return NextResponse.json(
      { error: "Error generating random data" },
      { status: 500 }
    );
  }
}
