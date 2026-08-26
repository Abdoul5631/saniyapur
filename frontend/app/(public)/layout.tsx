import { CorporateFooter } from "@/components/layout/corporate-footer";
import { CorporateHeader } from "@/components/layout/corporate-header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CorporateHeader />
      <main className="flex-1">{children}</main>
      <CorporateFooter />
    </>
  );
}
