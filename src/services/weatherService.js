import { DateTime } from "luxon";

const API_KEY = "216c7349fe33f04652f30035ca01b5c0";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = (infooType, searchParams) => {
  const url = new URL(BASE_URL + infooType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  return fetch(url).then((res) => res.json());
};

const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatTolocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);


const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;
  const { main: details, icon } = weather[0];

  const formattedLocalTime = formatTolocalTime(dt, timezone);
  return {
    temp:temp.toFixed(),
    feels_like:feels_like.toFixed(),
    temp_max:temp_max.toFixed(),
    temp_min:temp_min.toFixed(),
    humidity:humidity.toFixed(),
    name,
    country,
    sunrise: formatTolocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatTolocalTime(sunset, timezone, "hh:mm a"),
    speed:speed.toFixed(),
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  //hourly
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp.toFixed(),
      title: formatTolocalTime(f.dt, offset, "hh:mm a'"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);

  //daily
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "09:00:00") // shows 9 AM temp
    .map((f) => ({
      temp: f.main.temp.toFixed(),
      title: formatTolocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));
  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {

  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrent);

  const { dt, lat, lon, timezone } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;
