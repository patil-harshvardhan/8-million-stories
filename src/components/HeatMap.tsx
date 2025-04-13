"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const QuarterlyHeatmap = () => {
  // ===== PASTE YOUR HEATMAP DATA HERE =====
  // This should be your actual data for all properties shown in the heatmap
  const heatmapData = [
    {
      name: "Cliveden House",
      data: [
        { x: "Q2 2019", y: 15.5 },
        { x: "Q3 2019", y: 14.5 },
        { x: "Q4 2019", y: 15.5 },
        { x: "Q1 2020", y: 16.5 },
        { x: "Q2 2020", y: 15.5 },
        { x: "Q3 2020", y: 14.5 },
        { x: "Q4 2020", y: 15.5 },
        { x: "Q1 2021", y: 16.5 },
        { x: "Q2 2021", y: 15.5 },
        { x: "Q3 2021", y: 14.5 },
        { x: "Q4 2021", y: 15.5 },
        { x: "Q1 2022", y: 16.5 },
        { x: "Q2 2022", y: 15.5 },
        { x: "Q3 2022", y: 14.5 },
        { x: "Q4 2022", y: 15.5 },
        { x: "Q1 2023", y: 16.5 },
        { x: "Q2 2023", y: 15.5 },
      ],
    },
    {
      name: "Chewton Glen",
      data: [
        { x: "Q2 2019", y: 13.5 },
        { x: "Q3 2019", y: 14.5 },
        { x: "Q4 2019", y: 13.5 },
        { x: "Q1 2020", y: 15.5 },
        { x: "Q2 2020", y: 13.5 },
        { x: "Q3 2020", y: 14.5 },
        { x: "Q4 2020", y: 13.5 },
        { x: "Q1 2021", y: 15.5 },
        { x: "Q2 2021", y: 13.5 },
        { x: "Q3 2021", y: 14.5 },
        { x: "Q4 2021", y: 13.5 },
        { x: "Q1 2022", y: 15.5 },
        { x: "Q2 2022", y: 13.5 },
        { x: "Q3 2022", y: 14.5 },
        { x: "Q4 2022", y: 13.5 },
        { x: "Q1 2023", y: 15.5 },
        { x: "Q2 2023", y: 13.5 },
      ],
    },
    // Add more properties here
  ];
  // ===== END OF HEATMAP DATA SECTION =====

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "heatmap",
      background: "#202020",
      foreColor: "#ccc",
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
        fontSize: "18px",
        color: "#fff",
      },
    },
    plotOptions: {
      heatmap: {
        // ===== CUSTOMIZE COLOR SCALE HERE IF NEEDED =====
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 5,
              color: "#00A3E0", // Light blue
              name: "low",
            },
            {
              from: 5.1,
              to: 10,
              color: "#7B3FF2", // Purple
              name: "medium",
            },
            {
              from: 10.1,
              to: 15,
              color: "#2CD9C5", // Teal
              name: "high",
            },
            {
              from: 15.1,
              to: 20,
              color: "#FF6B6B", // Red
              name: "very high",
            },
          ],
        },
        // ===== END OF COLOR SCALE SECTION =====
      },
    },
    xaxis: {
      type: "category",
      labels: {
        style: {
          colors: "#fff",
        },
        formatter: (val: string) => {
          const [quarter] = val.split(" ");
          return `${quarter}`;
        },
      },
      axisBorder: {
        show: true,
        color: "#444",
      },
      axisTicks: {
        show: true,
        color: "#444",
      },
      title: {
        style: {
          color: "#fff",
        },
      },
      // ===== CUSTOMIZE YEAR GROUPING HERE IF NEEDED =====
      group: {
        groups: [
          { title: "2019", cols: 3 },
          { title: "2020", cols: 4 },
          { title: "2021", cols: 4 },
          { title: "2022", cols: 4 },
          { title: "2023", cols: 2 },
        ],
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: ["#fff"],
        },
      },
      // ===== END OF YEAR GROUPING SECTION =====
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
        },
      },
      title: {
        style: {
          color: "#fff",
        },
      },
      reversed: true, // To match the image where The Newt is at the top
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
