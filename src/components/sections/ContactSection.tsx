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
        className="relative flex flex-col items-center bg-pureBlack"
      >
        <h1 className="mt-4 border-b-[1rem] border-b-white text-10xl font-bold leading-[10rem] text-white">
          Contacts
        </h1>
      </section>
    );
  }
);

export default ContactsSection;
