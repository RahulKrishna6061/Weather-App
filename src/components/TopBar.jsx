import React from "react";

const TopBar = ({ setQuery, setCity }) => {
  const cities = [
    {
      id: 1,
      name: "Mumbai",
    },
    {
      id: 2,
      name: "Sydney",
    },
    {
      id: 3,
      name: "Tokyo",
    },
    {
      id: 4,
      name: "New York",
    },
    {
      id: 5,
      name: "London",
    },
  ];

  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-lg font-medium hover:bg-gray-700/20 px-3 rounded-md transition ease-in"
          onClick={() => {
            setQuery({ q: city.name });
            setCity("");
          }}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default TopBar;
