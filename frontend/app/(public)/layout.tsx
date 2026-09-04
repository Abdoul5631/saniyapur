import { CorporateFooter } from "@/components/layout/corporate-footer";
import { CorporateHeader } from "@/components/layout/corporate-header";
import { FloatingContact } from "@/components/ui/floating-contact";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CorporateHeader />
      <main className="flex-1">{children}</main>
      <CorporateFooter />
      <FloatingContact />
    </>
  );
}
