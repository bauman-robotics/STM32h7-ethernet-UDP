import io from "socket.io-client";
const socket = io.connect();

let ADC = {};

const val = document.getElementsByClassName("value");
socket.on("sample", function (msg) {
  ADC = msg;
  val[0].value = msg.I1;
  val[1].value = msg.V1;
  val[2].value = msg.I2;
  val[3].value = msg.V2;
  val[4].value = msg.I3;
  val[5].value = msg.V3;
  // led2.style.fill = "orange";
});

import Chart from "chart.js";
import "moment";
import "chartjs-plugin-streaming";

function updateChart(chart) {
  chart.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: ADC.I1,
    });
  });
}
function updateChart2(chart) {
  console.log(ADC);
  chart.data.datasets.forEach(function (dataset) {
    dataset.data.push({
      x: Date.now(),
      y: ADC.V1,
    });
  });
}

let conf = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Ток",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: [], // empty at the beginning
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: 20000,
            refresh: 1000,
            delay: 1000,
            pause: false,
            ttl: undefined,

            onRefresh: updateChart,
          },
        },
      ],
    },
    plugins: {
      streaming: {
        frameRate: 30, // chart is drawn 30 times every second
      },
    },
  },
};

let conf2 = {
  type: "line",
  data: {
    datasets: [
      {
        label: "Напряжение",
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        data: [], // empty at the beginning
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          type: "realtime",
          realtime: {
            duration: 20000,
            refresh: 1000,
            delay: 1000,
            pause: false,
            ttl: undefined,

            onRefresh: updateChart2,
          },
        },
      ],
    },
    plugins: {
      streaming: {
        frameRate: 30, // chart is drawn 30 times every second
      },
    },
  },
};

var ctx = document.getElementById("myChart").getContext("2d");
var chart = new Chart(ctx, conf);
var ctx2 = document.getElementById("myChart2").getContext("2d");
var chart = new Chart(ctx2, conf2);

// window.onload = () => {
//   "use strict";

//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.register("./sw.js");
//   }
// };
