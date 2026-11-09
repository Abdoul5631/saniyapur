import { CorporateFooter } from "@/components/layout/corporate-footer";
import { CorporateHeader } from "@/components/layout/corporate-header";
import { PageViewTracker } from "@/components/analytics/page-view-tracker";
import { FloatingContact } from "@/components/ui/floating-contact";
import { resolveMediaUrl } from "@/lib/media";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <CorporateHeader logoUrl={resolveMediaUrl(settings.logo)} />
      <main className="flex-1">{children}</main>
      <CorporateFooter />
      <FloatingContact />
      <PageViewTracker />
    </>
  );
}
