"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const LineChartWithAnnotations = () => {
  // Sample data for two properties (Cliveden House and Chewton Glen)
  // You can expand this with more properties as needed
  const chartData = {
    series: [
      {
        name: "Cliveden House",
        data: [
          6, 7, 6, 7, 8, 6, 7, 9, 10, 8, 4, 7, 10, 9, 8, 9, 8, 7, 6, 8, 9, 11,
          12, 8, 7, 6, 5, 7, 8, 6, 7, 4, 6, 7, 6, 7, 8,
        ],
      },
      {
        name: "Chewton Glen",
        data: [
          1, 3, 5, 4, 5, 5, 6, 5, 6, 7, 8, 13, 10, 8, 7, 6, 5, 4, 3, 6, 8, 19,
          8, 9, 5, 6, 7, 8, 7, 5, 6, 8, 12, 11, 10, 9, 9,
        ],
      },
    ],
    annotations: {
      xaxis: [
        {
          x: "12",
          borderColor: "#775DD0",
          label: {
            style: {
              color: "#fff",
              background: "#775DD0",
            },
            text: "2020",
          },
        },
        {
          x: "24",
          borderColor: "#775DD0",
          label: {
            style: {
              color: "#fff",
              background: "#775DD0",
            },
            text: "2021",
          },
        },
        {
          x: "36",
          borderColor: "#775DD0",
          label: {
            style: {
              color: "#fff",
              background: "#775DD0",
            },
            text: "2022",
          },
        },
        {
          x: "48",
          borderColor: "#775DD0",
          label: {
            style: {
              color: "#fff",
              background: "#775DD0",
            },
            text: "2023",
          },
        },
      ],
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
      categories: [
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "01",
        "02",
        "03",
        "04",
        "05",
      ],
      title: {
        text: "Month",
      },
      axisBorder:{
        show: false
      }
    },
    yaxis: {
      title: {
        text: "Query Count",
      },
      min: 0,
      max: 45,
      tickAmount: 9,
      axisBorder: {
        show : false,
      }
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      markers: {
        shape:"square",
      }
    },
    title: {
      text: "Query - By Month",
      align: "left",
      style: {
        fontSize: "20px",
      },
    },
    annotations: chartData.annotations,
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartData.series}
        type="line"
        height={500}
      />
    </div>
  );
};

export default LineChartWithAnnotations;
