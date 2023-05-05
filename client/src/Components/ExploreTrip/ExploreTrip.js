import "./ExploreTrip.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import HotelIcon from "@mui/icons-material/Hotel";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useEffect } from "react";

export default function ExploreTrip({ exploreTrip, setExploreTrip }) {
  // scrolls to top of the page when Explore component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="exploreTripContainer">
      <div className="exploreTripCard">
        <div className="exploreTripImage">
          <ArrowBackIosNewIcon onClick={() => setExploreTrip({})} />
          <img src={exploreTrip.img} alt="trip images" />
        </div>
        <div className="exploreTripHeader">
          <div className="exploreTripHeaderLeft">
            <h1>{exploreTrip.location}</h1>
            <h2>{exploreTrip.date}</h2>
          </div>
          <div className="exploreTripHeaderRight">
            <h1>{exploreTrip.price}</h1>
          </div>
        </div>
        <div className="exploreTripBody">
          <div className="exploreTripDescription">
            <div>{exploreTrip.description}</div>
          </div>
        </div>
      </div>
      <div className="comingSoonSection">
        <h3 className="comingSoonTitle">Coming Soon</h3>
        <h4 className="comingSoonSubtitle">
          Book your trip through our integrations with the following services:
        </h4>
        <div className="comingSoonIntegrations">
          <DirectionsCarIcon />
          <HotelIcon />
          <RestaurantMenuIcon />
        </div>
      </div>
    </div>
  );
}
