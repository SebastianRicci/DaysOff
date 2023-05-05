import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";

export default function TripCard({ trip, setExploreTrip }) {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        {trip.location}
      </Typography>
      <Typography level="body2">{trip.date}</Typography>
      <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
        <img
          src={trip.img}
          srcSet={`${trip.img} 1x, ${trip.img} 2x`}
          loading="lazy"
          alt="trip images"
        />
      </AspectRatio>
      <Box sx={{ display: "flex" }}>
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {trip.price}
          </Typography>
        </div>
        <Button
          onClick={() => {
            setExploreTrip(trip);
          }}
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Trip"
          sx={{ ml: "auto", fontWeight: 600 }}
        >
          Explore
        </Button>
      </Box>
    </Card>
  );
}
