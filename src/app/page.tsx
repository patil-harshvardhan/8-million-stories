"use client";
import QuarterlyHeatmap from "@/components/HeatMap";
import LineChartWithAnnotations from "@/components/LineChart";
import { useEffect, useState } from "react";
import { DataResponse } from "./api/data/route";

export default function Home() {

  const [data, setData] = useState <DataResponse>();

  const getData = async () => {
    const res = await fetch("/api/data?fromYear=2016&toYear=2018&highValue=200&fromMonth=6&toMonth=6");
    const data : DataResponse = await res.json();
    setData(data);
  }

  useEffect(() => {
    getData();
  },[])


  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm shadow-black dark:border-gray-400">
        {data && <LineChartWithAnnotations data={data} />}
      </div>
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm shadow-black dark:border-gray-400">
        {data && <QuarterlyHeatmap data={data} />}
      </div>
    </div>
  );
}
