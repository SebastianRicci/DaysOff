import "./TripsView.css";
import TripCard from "../../Components/TripCard/TripCard";
import ExploreTrip from "../../Components/ExploreTrip/ExploreTrip";
import EmptyState from "../../Components/EmptyState/EmptyState";
import { useState } from "react";

export default function TripsView({ trips }) {
  const [exploreTrip, setExploreTrip] = useState({});

  return exploreTrip.location ? (
    <ExploreTrip exploreTrip={exploreTrip} setExploreTrip={setExploreTrip} />
  ) : trips.length > 0 ? (
    <div className="TripsContainer">
      {trips.map((trip) => (
        <TripCard trip={trip} key={trip.date} setExploreTrip={setExploreTrip} />
      ))}
    </div>
  ) : (
    <EmptyState state={"Trips"} />
  );
}
