import React from "react";
import { Bar } from "react-chartjs-2";
import { IPoll, IpollAns } from "../jsfiles/interfaces";
import { Chart, registerables } from "chart.js";
import { Filler } from "chart.js";

Chart.register(Filler);
Chart.register(...registerables);

const Graph = (props: { poll: IPoll }) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: props.poll.question,
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
  let data: number[] = [1, 2];

  props.poll.answers.forEach((ans: IpollAns) => {
    labels.push(ans.answer);
    data.push(ans.count);
  });

  const polldata = {
    labels,
    datasets: [
      {
        label: "Answers",
        data: data,
        backgroundColor: ["blue", "red", "yellow", "green", "purple", "orange"],
      },
    ],
  };

  return (
    <>
      <Bar data={polldata} options={options} />
    </>
  );
};

export default Graph;
