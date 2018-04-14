/*
  Returns the Heart Rate BPM, with off-wrist detection.
  Callback rasied to update your UI.
*/
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";

let hrm, watchID, hrmCallback;
let lastReading = 0;

let heartRate;

export function initialize(callback) {
  hrmCallback = callback;
  hrm = new HeartRateSensor();
  hrm.start(); 
  lastReading = hrm.timestamp;
  start();
}

function getReading() {
  if (hrm.timestamp === lastReading) {
    heartRate = "--";
  } else {
    heartRate = hrm.heartRate;
  }
  lastReading = hrm.timestamp;
  hrmCallback({
    bpm: heartRate,
    zone: user.heartRateZone(hrm.heartRate || 0),
    restingHeartRate: user.restingHeartRate
  });
}

display.addEventListener("change", function() {
  if (display.on) {
    start();
  } else {
    stop();
  }
})

function start() {
  if (!watchID) {
    getReading();
    watchID = setInterval(getReading, 1000);
  }
}

function stop() {
  clearInterval(watchID);
  watchID = null;
}
