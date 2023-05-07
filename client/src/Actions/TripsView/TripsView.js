import "./TripsView.css";
import TripCard from "../../Components/TripCard/TripCard";
import ExploreTrip from "../../Components/ExploreTrip/ExploreTrip";
import EmptyState from "../../Components/EmptyState/EmptyState";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TripsView({ trips }) {
  const [exploreTrip, setExploreTrip] = useState({});

  return exploreTrip.location ? (
    <ExploreTrip exploreTrip={exploreTrip} setExploreTrip={setExploreTrip} />
  ) : trips.length > 0 ? (
    <div className="TripsContainer">
      {trips.map((trip, index) => (
        <motion.div
          transition={{ delay: 0.1 * index }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={trip.location}
        >
          <TripCard
            trip={trip}
            key={trip.date}
            setExploreTrip={setExploreTrip}
          />
        </motion.div>
      ))}
    </div>
  ) : (
    <EmptyState state={"Trips"} />
  );
}
