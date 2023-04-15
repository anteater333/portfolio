import React from "react";
import SectionProps from "./SectionProps";

const ContactsSection = React.forwardRef<HTMLElement, SectionProps>(
  (props: SectionProps, ref) => {
    return (
      <section id="contacts-section" ref={ref} className={`h-recommended`}>
        <h2>Contacts</h2>
      </section>
    );
  }
);

export default ContactsSection;
