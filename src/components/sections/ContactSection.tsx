import { useEffect } from "react";
import SectionProps from "./SectionProps";

function ContactsSection({ updateLoadingProgress }: SectionProps) {
  useEffect(() => {
    updateLoadingProgress(100, 4);
  }, [updateLoadingProgress]);

  return (
    <section
      id="contacts-section"
      className="relative flex h-recommended flex-col items-center bg-pureBlack"
    >
      <h1 className="mt-4 border-b-[1rem] border-b-white text-10xl font-bold leading-[10rem] text-white">
        Contacts
      </h1>
    </section>
  );
}

export default ContactsSection;
