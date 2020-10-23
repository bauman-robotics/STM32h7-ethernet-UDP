const socket = io.connect();

const val = document.getElementsByClassName("value");
socket.on("current", function (I) {
  val[0].value = I;
});
socket.on("voltage", function (V) {
  val[1].value = V;
  led2.style.fill = "orange";
});

// window.onload = () => {
//   "use strict";

//   if ("serviceWorker" in navigator) {
//     navigator.serviceWorker.register("./sw.js");
//   }
// };
