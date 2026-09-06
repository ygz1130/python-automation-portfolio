import { EditorialHero } from "../components/EditorialHero";
import { SelectedWork } from "../components/SelectedWork";
import {
  Services,
  Process,
  StudioStatement,
} from "../components/StudioSections";
import { InquirySection } from "../components/InquiryForm";
export function HomePage() {
  return (
    <>
      <EditorialHero />
      <SelectedWork />
      <Services />
      <Process />
      <StudioStatement />
      <InquirySection />
    </>
  );
}
