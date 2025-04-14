"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  const [allSeries, setAllSeries] = useState<ChartData["series"]>([]);
  const [categories, setCategories] = useState<ChartData["categories"]>([]);
  const [annotations, setAnnotations] = useState<ChartData["annotations"]>([]);
  const [selectedBrands, setSelectedBrands] = useState<{
    [key: string]: boolean;
  }>({});

  // Process data only when it changes
  useEffect(() => {
    const series = data.data.map((brandData) => {
      const dataPoints = brandData.data.map((point) => point.value);
      return {
        name: brandData.brand,
        data: dataPoints,
      };
    });

    // Initialize selected brands (first 3 by default)
    const initialSelectedBrands: { [key: string]: boolean } = {};
    series.forEach((s, index) => {
      initialSelectedBrands[s.name] = index < 3;
    });

    // Get unique categories (months and years)
    const categoriesSet = new Set<string>(
      data.data.flatMap((brandData) =>
        brandData.data.map((point) => `${point.month} ${point.year}`)
      )
    );

    // Get December annotations
    const annotationsSet = new Set<string>(
      data.data.flatMap((brandData) =>
        brandData.data
          .filter((point) => `${point.month}` === "12")
          .map((point) => `${point.month} ${point.year}`)
      )
    );

    setAllSeries(series);
    setSelectedBrands(initialSelectedBrands);
    setCategories(Array.from(categoriesSet));
    setAnnotations(Array.from(annotationsSet));
  }, [data]);

  // Memoize visible series to prevent unnecessary recalculations
  const visibleSeries = useMemo(
    () => allSeries.filter((series) => selectedBrands[series.name]),
    [allSeries, selectedBrands]
  );

  // Memoize chart annotations to prevent unnecessary rebuilds
  const chartAnnotations = useMemo(
    () => ({
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
    }),
    [annotations]
  );

  // Use callbacks for event handlers
  const toggleBrand = useCallback((brandName: string) => {
    setSelectedBrands((prev) => ({
      ...prev,
      [brandName]: !prev[brandName],
    }));
  }, []);

  const selectAll = useCallback(() => {
    setSelectedBrands((prev) => {
      const newSelection = { ...prev };
      Object.keys(newSelection).forEach((key) => {
        newSelection[key] = true;
      });
      return newSelection;
    });
  }, []);

  const deselectAll = useCallback(() => {
    setSelectedBrands((prev) => {
      const newSelection = { ...prev };
      Object.keys(newSelection).forEach((key) => {
        newSelection[key] = false;
      });
      return newSelection;
    });
  }, []);

  // Memoize chart options to prevent unnecessary rebuilds
  const chartOptions = useMemo<ApexCharts.ApexOptions>(
    () => ({
      theme: {
        mode: "dark",
      },
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: true,
          type: "x",
        },
        background: "transparent",
        toolbar: {
          show: false,
        },
      },
      colors: [
        "#00BCD4",
        "#775DD0",
        "#FF5722",
        "#4CAF50",
        "#FFC107",
        "#9C27B0",
        "#3F51B5",
        "#E91E63",
      ],
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
      responsive: [
        {
          breakpoint: 1200,
          options: {
            xaxis: {
              tickAmount: 15,
            },
          },
        },
        {
          breakpoint: 768,
          options: {
            xaxis: {
              tickAmount: 8,
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            xaxis: {
              tickAmount: 5,
            },
          },
        },
      ],
      annotations: chartAnnotations,
    }),
    [categories, chartAnnotations]
  );

  return (
    <div>
      <div className="mb-5">
        <div className="mb-2.5">
          <button
            onClick={selectAll}
            className="mr-2.5 px-2.5 py-1.5 bg-neutral-600 text-white border-none rounded cursor-pointer hover:bg-neutral-500"
          >
            Select All
          </button>
          <button
            onClick={deselectAll}
            className="px-2.5 py-1.5 bg-neutral-600 text-white border-none rounded cursor-pointer hover:bg-neutral-500"
          >
            Deselect All
          </button>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {allSeries.map((series) => (
            <label
              key={series.name}
              className={`inline-flex items-center px-2.5 py-1.5 rounded cursor-pointer ${
                selectedBrands[series.name]
                  ? "bg-neutral-700"
                  : "bg-neutral-800"
              } hover:bg-neutral-600`}
            >
              <input
                type="checkbox"
                checked={selectedBrands[series.name] || false}
                onChange={() => toggleBrand(series.name)}
                className="mr-1.5"
              />
              {series.name}
            </label>
          ))}
        </div>
      </div>
      <ReactApexChart
        options={chartOptions}
        series={visibleSeries}
        type="line"
        height={500}
      />
    </div>
  );
};

export default React.memo(LineChartWithAnnotations);
