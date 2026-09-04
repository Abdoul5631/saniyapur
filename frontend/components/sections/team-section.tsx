import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TeamCard } from "@/components/team/team-card";
import type { TeamMember } from "@/types/admin";

export function TeamSection({ members }: { members: TeamMember[] }) {
  if (!members.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#dce5df] bg-[#f7f8f6] p-8 text-center">
        <p className="text-sm font-medium text-[#526259]">
          Les membres de l’équipe seront bientôt présentés ici.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, index) => (
        <Reveal key={member.id} delayMs={index * 60}>
          <TeamCard member={member} />
        </Reveal>
      ))}
    </div>
  );
}
