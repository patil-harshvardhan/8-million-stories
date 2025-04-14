"use client";
import QuarterlyHeatmap from "@/components/HeatMap";
import LineChartWithAnnotations from "@/components/LineChart";
import { useEffect, useState } from "react";
import { DataResponse } from "./api/data/route";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const [data, setData] = useState<DataResponse>();

  const getData = async () => {
    const res = await fetch(
      "/api/data?fromYear=2016&toYear=2018&highValue=200&fromMonth=6&toMonth=6"
    );
    if (res.ok) {
      const data: DataResponse = await res.json();
      setData(data);
    }
    else{
      console.error("Error fetching data:", res.statusText);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data ? (
        <div className="flex flex-col gap-6 p-6">
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm shadow-black dark:border-gray-400">
            <LineChartWithAnnotations data={data} />
          </div>
          <div className="p-6 border border-gray-200 rounded-lg shadow-sm shadow-black dark:border-gray-400">
            <QuarterlyHeatmap data={data} />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
