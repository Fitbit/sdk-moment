import clock from "clock";
import document from "document";
import { preferences } from "user-settings";

import * as activityStats from "./activity_stats.js";
import { days, months } from "./locales/en.js";
import * as util from "../common/utils";

clock.granularity = "minutes";

let clockLabel = document.getElementById("clockLabel");
let dateLabel = document.getElementById("dateLabel");
let statLabel = document.getElementById("statLabel");
let hrmLabel = document.getElementById("hrmLabel");

function updateClock(evt) {
  let today = evt.date;

  let dayName = days[today.getDay()];
  let monthName = months[today.getMonth()];
  let dayNumber = util.zeroPad(today.getDate());

  let hours = today.getHours();
  let mins = util.zeroPad(today.getMinutes());

  if (preferences.clockDisplay === "12h") {
    hours = (hours + 24) % 12 || 12;
  }
  else {
    hours = util.zeroPad(hours);
  }

  clockLabel.text = `${hours}:${mins}`;
  dateLabel.text = `${dayName} ${monthName} ${dayNumber}`;
}

clock.ontick = (evt) => updateClock(evt);

setInterval(function() {
  statLabel.text = activityStats.getSteps();
  hrmLabel.text = activityStats.getHR();
}, 1000)
