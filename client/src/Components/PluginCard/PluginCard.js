import "./PluginCard.css";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

export default function PluginCard() {
  const plugins = [
    {
      name: "Kayak",
      icon: <HotelIcon />,
      description: "Search for flights, hotels, and rental cars.",
    },
    {
      name: "OpenTable",
      icon: <RestaurantMenuIcon />,
      description: "Search for restaurants and make reservations.",
    },
    {
      name: "Expedia",
      icon: <DirectionsCarIcon />,
      description: "Get there, stay there, find things to see and do.",
    },
  ];
  return (
    <>
      {plugins.map((plugin) => (
        <div className="pluginCardContainer" key={plugin.name}>
          <div className="pluginCardIcon" id={plugin.name}>
            <div>{plugin.icon}</div>
          </div>
          <div className="pluginCardDescription">
            <div className="pluginCardDescriptionTitle">{plugin.name}</div>
            <div className="pluginCardDescriptionBody">
              <div>{plugin.description}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
