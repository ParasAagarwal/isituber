import React from "react";

const LocationSearchPanel = (props) => {
  //sample array for location
  const locations = [
    {
      name: "T2,Ace Divino, Greater Noida West , 201306",
    },
    {
      name: "B5,The great Cleo County,Noida East, 201110",
    },
    {
      name: "Z1,Yatharth Hospital, Noida Extension , 201401",
    },
  ];
  return (
    <div>
      {/* this is just a sample data */}

      {locations.map((location, index) => (
        <div
          key={index}
          onClick={() => {
            props.setVehiclePanel(true), props.setPanelOpen(false);
          }}
          className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
        >
          <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium">{location.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
