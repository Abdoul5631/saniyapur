import Image from "next/image";
import { resolveMediaUrl } from "@/lib/media";
import type { TeamMember } from "@/types/admin";

export function TeamCard({ member }: { member: TeamMember }) {
  const photoUrl = member.photo ? resolveMediaUrl(member.photo) : null;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dce5df] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#a85c36]/40 hover:shadow-lg">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {photoUrl ? (
            <div className="relative size-24 sm:size-28 shrink-0 overflow-hidden rounded-2xl border-2 border-[#a85c36]/25 bg-[#f7f8f6] shadow-sm">
              <Image
                src={photoUrl}
                alt={member.name}
                fill
                unoptimized
                className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                sizes="112px"
              />
            </div>
          ) : (
            <div className="flex size-24 sm:size-28 shrink-0 items-center justify-center rounded-2xl border-2 border-[#a85c36]/25 bg-[#f1e4dc] text-2xl font-bold text-[#a85c36] shadow-xs">
              {member.name.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold tracking-tight text-[#16232a] transition-colors group-hover:text-[#a85c36]">
              {member.name}
            </h3>
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#a85c36]">
              {member.role}
            </p>
            {member.phone && (
              <p className="mt-1.5 text-xs font-mono font-semibold text-[#3f5149]">
                📞 {member.phone}
              </p>
            )}
          </div>
        </div>

        {member.bio && (
          <div className="mt-4 border-t border-[#f0f4f1] pt-3 text-xs sm:text-sm leading-relaxed text-[#526259]">
            <p className="line-clamp-4">{member.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
