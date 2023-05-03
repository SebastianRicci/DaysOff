import "./TripsView.css";
import TripCard from "../../Components/TripCard/TripCard";
import EmptyState from "../../Components/EmptyState/EmptyState";
export default function TripsView({ trips }) {
  return trips.length > 0 ? (
    <div className="TripsContainer">
      {trips.map((trip) => (
        <TripCard trip={trip} key={trip.date} />
      ))}
    </div>
  ) : (
    <EmptyState state={"Trips"} />
  );
}
