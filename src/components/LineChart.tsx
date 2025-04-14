"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { DataResponse } from "@/app/api/data/route";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartData {
  series: {
    name: string;
    data: number[];
  }[];
  annotations: string[];
  categories: string[];
}

interface ChartProps {
  data: DataResponse;
}

const LineChartWithAnnotations: React.FC<ChartProps> = ({ data }) => {
  const [series, setSeries] = useState<ChartData["series"]>([]);
  const [categories, setCategories] = useState<ChartData["categories"]>([]);
  const [annotations, setAnnotations] = useState<ChartData["annotations"]>([]);

  const getChartData = (data: DataResponse) => {
    const series = data.data.map((brandData) => {
      const dataPoints = brandData.data.map((point) => point.value);
      return {
        name: brandData.brand,
        data: dataPoints,
      };
    });

    // find all the unique years + months from the data
    const categories = new Set<string>(
      data.data.flatMap((brandData) => {
        return brandData.data.map((point) => `${point.month} ${point.year}`);
      })
    );

    // find all the unique 12th months from the data
    const annotations = new Set<string>(
      data.data.flatMap((brandData) => {
        return brandData.data
          .filter((point) => `${point.month}` === "12")
          .map((point) => `${point.month} ${point.year}`);
      })
    );
    setSeries(series);
    setCategories(Array.from(categories));
    setAnnotations(Array.from(annotations));
  };

  useEffect(() => {
    getChartData(data);
  }, [data]);

  const chartDataBuilder = {
    series,
    annotations: {
      xaxis: annotations.map((annotation) => ({
        x: annotation,
        borderColor: "#775DD0",
        label: {
          style: {
            color: "#fff",
            background: "#775DD0",
          },
          text: annotation.split(" ")[1],
        },
      })),
    },
  };

  const chartOptions: ApexCharts.ApexOptions = {
    theme: {
      mode: "dark",
    },

    chart: {
      height: 350,
      type: "line",
      background: "transparent",
      toolbar: {
        show: false,
      },
    },
    colors: ["#00BCD4", "#775DD0"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    grid: {
      borderColor: "#444",
      row: {
        colors: ["transparent"],
        opacity: 0.5,
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      overwriteCategories: categories.map((category) =>
        category.split(" ")[0].padStart(2, "0")
      ),
      categories: categories,
      title: {
        text: "Month",
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: "Query Count",
      },
      min: 0,
      tickAmount: 9,
      axisBorder: {
        show: false,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      markers: {
        shape: "square",
      },
    },
    title: {
      text: "Query - By Month",
      align: "left",
      style: {
        fontSize: "20px",
      },
    },
    annotations: chartDataBuilder.annotations,
  };
  console.log("chartOptions", chartOptions);
  console.log("Categories", categories);
  console.log("series", series);
  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartDataBuilder.series}
        type="line"
        height={500}
      />
    </div>
  );
};

export default LineChartWithAnnotations;
