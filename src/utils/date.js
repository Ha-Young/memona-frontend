import { season as SEASON } from "../constants/index";

export function getFormatDate(date, hasTime = false) {
  const year = date.getFullYear();
  let month = 1 + date.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = date.getDate();
  day = day >= 10 ? day : "0" + day;

  let result = year + month + day;

  if (hasTime) {
    let hour = date.getHours();
    hour = hour >= 10 ? hour : "0" + hour;
    const min = date.getMinutes();
    const sec = date.getSeconds();

    result += "_" + hour + ":" + min + ":" + sec;
  }

  return result;
}

export function getCurYearSeason() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString();

  let season;

  if (month >= 3 && month <= 5) {
    season = SEASON.SPRING;
  } else if (month >= 6 && month <= 8) {
    season = SEASON.SUMMER;
  } else if (month >= 9 && month <= 11) {
    season = SEASON.AUTUMN;
  } else {
    season = SEASON.WINTER;
  }

  return { year, season, date };
}
