import React from "react";
import { BiSolidDroplet } from "react-icons/bi";
import { FaThermometerEmpty, FaWind } from "react-icons/fa";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const TempAndDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_max,
    temp_min,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const unitSymbol = units === "imperial" ? "°F" : "°C";
  const verticalDetails = [
    {
      id: 1,
      title: "Feels like",
      Icon: FaThermometerEmpty,
      value: `${feels_like}${unitSymbol}`,
    },
    {
      id: 2,
      title: "Humidity",
      Icon: BiSolidDroplet,
      value: `${humidity}%`,
    },
    {
      id: 3,
      title: "Wind",
      Icon: FaWind,
      value: `${speed}km/h`,
    },
  ];

  const horizontalDetails = [
    {
      id: 1,
      title: "Sunrise",
      Icon: GiSunrise,
      value: sunrise,
    },
    {
      id: 2,
      title: "Sunset",
      Icon: GiSunset,
      value: sunset,
    },
    {
      id: 3,
      title: "High",
      Icon: MdKeyboardArrowUp,
      value: `${temp_max}°`,
    },
    {
      id: 4,
      title: "Low",
      Icon: MdKeyboardArrowDown,
      value: `${temp_min}°`,
    },
  ];
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between py-3">
        <img src={icon} alt="weather-icon" className="w-20" />
        <p className="text-5xl">{`${temp}${unitSymbol}`}</p>

        <div className="flex flex-col space-y-3 items-start">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-sm items-center justify-center"
            >
              <Icon size={18} className="mr-1" />
              {`${title}:`}
              <span className="font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-10 textsm py-3">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex  flex-row font-lightitems-center ">
            <Icon size={30} />
            <p className="font-light ml-1">
              {`${title}:`}
              <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempAndDetails;
