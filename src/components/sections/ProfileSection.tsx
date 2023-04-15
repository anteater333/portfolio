import React from "react";
import SectionProps from "./SectionProps";

const ProfileSection = React.forwardRef<HTMLElement, SectionProps>(
  (props: SectionProps, ref) => {
    return (
      <section id="profile-section" ref={ref} className={`h-recommended`}>
        <h2>Profile</h2>
      </section>
    );
  }
);

export default ProfileSection;
