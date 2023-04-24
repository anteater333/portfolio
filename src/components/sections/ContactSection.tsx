import React, { useEffect } from "react";
import SectionProps from "./SectionProps";

const ContactsSection = React.forwardRef<HTMLElement, SectionProps>(
  ({ updateLoadingProgress }: SectionProps, ref) => {
    useEffect(() => {
      updateLoadingProgress(100, 4);
    }, [updateLoadingProgress]);

    return (
      <section
        id="contacts-section"
        ref={ref}
        className="relative overflow-hidden bg-black"
      >
        <h2>Contacts</h2>
      </section>
    );
  }
);

export default ContactsSection;
