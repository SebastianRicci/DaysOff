import "./OnboardingView.css";
import { useState } from "react";
import OnboardingStepper from "../../Components/OnboardingStepper/OnboardingStepper";
import OnboardingCarousel from "../../Components/OnboardingCarousel/OnboardingCarousel";

export default function OnboardingView({ setOnboarding }) {
  const [slide, setSlide] = useState(0);
  return (
    <div className="OnboardingContainer">
      <OnboardingCarousel
        slide={slide}
        setSlide={setSlide}
        setOnboarding={setOnboarding}
      />
      <OnboardingStepper slide={slide} />
    </div>
  );
}
