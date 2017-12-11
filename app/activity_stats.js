import { HeartRateSensor } from "heart-rate";
import { today } from "user-activity";

var hrm = new HeartRateSensor();

export function getHR() {
  return hrm.heartRate || "--";
}

export function getSteps() {
  return (today.local.steps || 0).toLocaleString();
}

export function getCalories() {
  return (today.local.calories || 0).toLocaleString();
}

export function getDistance() {
  // TODO: Units?
  return (today.local.distance || 0);
}

export function getFloors() {
  return (today.local.floors || 0).toLocaleString();
}

export function getActiveMinutes() {
  return (today.local.activeMinutes || 0).toLocaleString();
}

hrm.start();
