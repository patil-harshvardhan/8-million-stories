"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DataResponse } from "@/app/api/data/route";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface DataPoints {
  x: string;
  y: number;
}

export interface HeatmapData {
  name: string;
  data: DataPoints[];
}

interface QuarterlyHeatmapProps {
  data: DataResponse;
}

const QuarterlyHeatmap: React.FC<QuarterlyHeatmapProps> = ({ data }) => {
  const [groups, setGroups] = useState<{ title: string; cols: number }[]>([]);
  const [highValue, setHighValue] = useState(0);
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);

  const getHeatmapData = (data: DataResponse) => {
    return data.data.map((brandData) => {
      const dataPoints = brandData.data.map((point) => ({
        x: `${point.month} ${point.year}`,
        y: point.value,
      }));
      return {
        name: brandData.brand,
        data: dataPoints,
      };
    });
  };

  const getGroupsFromData = (data: HeatmapData[]) => {
    const years = new Set<string>(
      data.flatMap((item) => item.data.map((d) => d.x.split(" ")[1]))
    );
    const groups = Array.from(years).map((year) => {
      const cols = Math.max(
        ...data.map(
          (item) => item.data.filter((d) => d.x.includes(year)).length
        )
      );
      return { title: year, cols };
    });
    groups.sort((a, b) => parseInt(a.title) - parseInt(b.title));
    return groups;
  };

  const getHighValueFromData = (data: HeatmapData[]) => {
    const maxValue = Math.max(
      ...data.flatMap((item) => item.data.map((d) => d.y))
    );
    return maxValue;
  };

  useEffect(() => {
    const calHeatmapData = getHeatmapData(data);
    setHeatmapData(calHeatmapData);
    const calGroups = getGroupsFromData(calHeatmapData);
    setGroups(calGroups);
    const calHighValue = getHighValueFromData(calHeatmapData);
    setHighValue(calHighValue);
  }, [data]);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "heatmap",
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#fff"],
      },
    },
    colors: ["#008FFB"],
    title: {
      text: "Query - Quarterly Heatmap",
      align: "left",
      style: {
        fontSize: "20px",
      },
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: 0,
              to: highValue * 0.25,
              color: "#00A3E0", // Light blue
              name: "low",
            },
            {
              from: highValue * 0.25 + 0.1,
              to: highValue * 0.5,
              color: "#7B3FF2", // Purple
              name: "medium",
            },
            {
              from: highValue * 0.5 + 0.1,
              to: highValue * 0.75,
              color: "#2CD9C5", // Teal
              name: "high",
            },
            {
              from: highValue * 0.75 + 0.1,
              to: highValue,
              color: "#FF6B6B", // Red
              name: "very high",
            },
          ],
        },
      },
    },
    xaxis: {
      type: "category",
      labels: {
        formatter: (val: string) => {
          const [quarter] = val.split(" ");
          return `${quarter}`;
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      group: {
        groups,
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: ["#fff"],
        },
      },
    },
    yaxis: {
      reversed: true,
    },
    grid: {
      borderColor: "#444",
      padding: {
        right: 20,
        left: 20,
      },
    },
    theme: {
      mode: "dark",
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={heatmapData}
        type="heatmap"
        height={500}
      />
    </div>
  );
};

export default QuarterlyHeatmap;
