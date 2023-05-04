import "./OnboardingCarousel.css";
import React from "react";
import Carousel from "react-material-ui-carousel";
import SettingsIcon from "@mui/icons-material/Settings";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Button from "@mui/material/Button";

export default function OnboardingCarousel({ slide, setSlide, setOnboarding }) {
  var items = [
    {
      name: "Configure",
      description:
        "Input your location, available PTO, and weekend preferences to generate a personalized vacation calendar with our paid time off optimization tool.",
      icon: <SettingsIcon />,
    },
    {
      name: "Customize",
      description:
        "Select days and specify vacation, work, or holiday to customize your vacation schedule and enjoy longer trips with our intuitive app.",
      icon: <BeachAccessIcon />,
    },
    {
      name: "Optimize",
      description:
        "Optimize your time off and get trip recommendations based on your preferences and availability with our innovative paid time off optimization tool and analytics.",
      icon: <CalendarMonthIcon />,
    },
  ];

  return (
    <Carousel
      navButtonsAlwaysVisible={true}
      cycleNavigation={false}
      autoPlay={false}
      animation="slide"
      indicators={false}
      onChange={(newSlide) => {
        setSlide(newSlide);
      }}
    >
      {items.map((item, i) => (
        <div className="OnboardingCard" key={i}>
          <h1>{item.name}</h1>
          <div className="OnboardingCardIcon">{item.icon}</div>
          <p>{item.description}</p>
          {slide === 2 && (
            <Button
              style={{
                background:
                  "linear-gradient(135deg, rgb(46, 170, 250) 0%, rgb(140, 4, 219) 100%)",
                color: "#fff",
              }}
              size="large"
              variant="contained"
              onClick={() => setOnboarding(false)}
            >
              Get Started
            </Button>
          )}
        </div>
      ))}
    </Carousel>
  );
}
