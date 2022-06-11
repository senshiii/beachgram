import React from "react";
import BottomNav from "../components/BottomNav/BottomNav";

const BeachProfile = () => {
  return (
    <>
      <BottomNav
        eventsHref="/beach/events"
        campHref="/beach/campaigns"
        jobHref="/beach/work"
        profileHref="/beach/profile"
        activeTabId={3}
      />
    </>
  );
};

export default BeachProfile;
