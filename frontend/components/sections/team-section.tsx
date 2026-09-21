import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TeamCard } from "@/components/team/team-card";
import type { TeamMember } from "@/types/admin";

export function TeamSection({ members }: { members: TeamMember[] }) {
  if (!members.length) return null;

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
