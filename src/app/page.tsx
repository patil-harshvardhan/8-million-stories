"use client";
import QuarterlyHeatmap, { HeatmapData } from "@/components/HeatMap";
import LineChartWithAnnotations from "@/components/LineChart";
import { useEffect, useState } from "react";
import { DataResponse } from "./api/data/route";

export default function Home() {

  const [heatmapData, setHeatmapData] = useState < HeatmapData[]>([]);

  const getData = async () => {
    const res = await fetch("/api/data?fromYear=2016&toYear=2018&highValue=200&fromMonth=6&toMonth=6");
    const data : DataResponse = await res.json();

    const heatMapData = data.data.map((brandData) => {
      const dataPoints = brandData.data.map((point) => ({
        x: `${point.month} ${point.year}`,
        y: point.value,
      }));
      return {
        name: brandData.brand,
        data: dataPoints,
      };
    });

    const lineChartData = {
      series: heatMapData.map((brand) => ({
        name: brand.name,
        data: brand.data.map((point) => point.y),
      })),
      xaxis: {
        categories: heatMapData[0].data.map((point) => point.x),
      },
      annotations: {
        xaxis: data.data.map((brandData) => ({
          x: `${brandData.data[0].month} ${brandData.data[0].year}`,
          borderColor: "#775DD0",
          label: {
            style: {
              color: "#fff",
              background: "#775DD0",
            },
            text: brandData.brand,
          },
        })),
      },
    }
    setHeatmapData(heatMapData);
  }

  useEffect(() => {
    getData();
  },[])


  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm shadow-black dark:border-gray-400">
        <LineChartWithAnnotations />
      </div>
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm shadow-black dark:border-gray-400">
        {heatmapData && heatmapData.length && <QuarterlyHeatmap heatmapData={heatmapData} />}
      </div>
    </div>
  );
}
