import QuarterlyHeatmap from "@/components/HeatMap";
import LineChartWithAnnotations from "@/components/LineChart";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm shadow-black dark:border-gray-700">
        <LineChartWithAnnotations />
      </div>
      <div className="p-6 border border-gray-200 rounded-lg shadow-sm shadow-black dark:border-gray-700">
        <QuarterlyHeatmap />
      </div>
    </div>
  );
}
