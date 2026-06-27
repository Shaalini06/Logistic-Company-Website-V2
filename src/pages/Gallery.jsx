import { useEffect } from "react";
import AOS from "aos";
import PageHeader from "../components/PageHeader";
import Gallery from "../components/Gallery";

export default function GalleryPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Explore our operations and facilities"
      />
      <section className="py-5">
        <Gallery />
      </section>
    </>
  );
}
