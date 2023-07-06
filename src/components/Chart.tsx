import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart: React.FC = () => {
  const { data: graphData, isLoading } = useQuery<any, Error>(
    ["graphData"],
    async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      const data = await response.json();
      return data;
    }
  );

  if (isLoading) {
    return <div>Loading graph data...</div>;
  }

  const chartDataCases = {
    labels: Object.keys(graphData.cases),
    datasets: [
      {
        label: "Cases",
        fill: true,
        borderColor: "blue",
        backgroundColor: "#00f5",
        data: Object.values(graphData.cases),
      },
    ],
  };
  const chartDataDeaths = {
    labels: Object.keys(graphData.deaths),
    datasets: [
      {
        label: "Deaths",
        borderColor: "red",
        fill: true,
        backgroundColor: "#f005",
        data: Object.values(graphData.deaths),
      },
    ],
  };
  const chartDataRecovered = {
    labels: Object.keys(graphData.recovered),
    datasets: [
      {
        label: "Recovered",
        borderColor: "green",
        fill: true,
        backgroundColor: "#0f05",
        data: Object.values(graphData.recovered),
      },
    ],
  };

  return (
    <div className="p-4 w-full h-full">
      <h2 className="text-xl font-bold mb-4">Cases Fluctuations</h2>
      <div className="flex">
        <div className="w-[400px]">
          <Line data={chartDataCases} />
        </div>
        <div className="w-[400px]">
          <Line data={chartDataDeaths} />
        </div>
        <div className="w-[400px]">
          <Line color="red" data={chartDataRecovered} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
