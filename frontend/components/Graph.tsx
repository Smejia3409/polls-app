import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { IPoll, IpollAns } from "../jsfiles/interfaces";
import { Chart, registerables } from "chart.js";
import { Filler } from "chart.js";

Chart.register(Filler);
Chart.register(...registerables);

const Graph = (props: { poll: IPoll }) => {
  const options = {
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    cutoutPercentage: 100,

    plugins: {
      title: {
        display: true,
        text: props.poll.question,
      },
      legend: {
        position: "right" as const,
      },
      labels: {
        render: "percentage",
        precision: 1,
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  let labels: string[] = [];
  let data: number[] = [];

  props.poll.answers.forEach((ans: IpollAns) => {
    labels.push(ans.answer);
    data.push(ans.count);
  });

  const polldata = {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: ["blue", "red", "yellow", "green", "purple", "orange"],
      },
    ],
  };

  return (
    <div
      className=""
      style={{
        height: "60vh",
        position: "relative",
        marginBottom: "1%",
        padding: "1%",
      }}
    >
      <Bar data={polldata} options={options} />
    </div>
  );
};

export default Graph;
