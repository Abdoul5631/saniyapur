"use client";
import { useState } from "react";

type Day = { date: string; views: number; visitors: number };

const dayFormat = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });
const longFormat = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" });
const parse = (iso: string) => new Date(`${iso}T12:00:00`);

/** Maximum d'axe « propre » (4, 6, 8, 10, 20, 40…) pour des graduations lisibles. */
function niceMax(value: number): number {
  if (value <= 4) return 4;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  for (const factor of [1, 2, 4, 6, 8, 10]) {
    if (factor * magnitude >= value) return factor * magnitude;
  }
  return 10 * magnitude;
}

export function VisitsChart({ daily }: { daily: Day[] }) {
  const [active, setActive] = useState<number | null>(null);
  const max = niceMax(Math.max(...daily.map((day) => day.visitors), 0));
  const ticks = [max, max / 2, 0];
  const labelAt = new Set([0, Math.floor((daily.length - 1) / 2), daily.length - 1]);
  const shown = active !== null ? daily[active] : null;
  const total = daily.reduce((sum, day) => sum + day.visitors, 0);

  return (
    <div>
      <div
        role="group"
        aria-label={`Visiteurs par jour sur ${daily.length} jours : ${total} au total. Le tableau sous le graphique donne le détail.`}
        className="relative pl-9"
        onMouseLeave={() => setActive(null)}
      >
        <div className="relative h-52">
          {ticks.map((tick) => (
            <div key={tick} className="absolute inset-x-0 flex items-center" style={{ bottom: `${(tick / max) * 100}%` }}>
              <span className="-ml-9 w-8 pr-1 text-right text-[11px] tabular-nums text-[#8a9a92]">{Math.round(tick)}</span>
              <span className={`h-px flex-1 ${tick === 0 ? "bg-[#c9d5cd]" : "bg-[#eef2ef]"}`} />
            </div>
          ))}
          <div className="absolute inset-0 flex items-end gap-[3px]">
            {daily.map((day, index) => (
              <div
                key={day.date}
                className="relative flex h-full flex-1 items-end"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                aria-label={`${longFormat.format(parse(day.date))} : ${day.visitors} visiteur${day.visitors > 1 ? "s" : ""}, ${day.views} page${day.views > 1 ? "s" : ""} vue${day.views > 1 ? "s" : ""}`}
              >
                <span
                  className={`block w-full rounded-t-[4px] transition-colors ${active === index ? "bg-[#7d4326]" : "bg-[#a85c36]"}`}
                  style={{ height: `${(day.visitors / max) * 100}%`, minHeight: day.visitors > 0 ? 3 : 0 }}
                />
              </div>
            ))}
          </div>
          {shown && active !== null && (
            <div
              className="pointer-events-none absolute top-0 z-10 w-44 -translate-x-1/2 rounded-xl border border-[#dce5df] bg-white px-3 py-2 text-xs shadow-lg"
              style={{ left: `${Math.min(Math.max(((active + 0.5) / daily.length) * 100, 14), 86)}%` }}
            >
              <p className="font-semibold capitalize text-[#16232a]">{longFormat.format(parse(shown.date))}</p>
              <p className="mt-1 text-[#526259]">
                <span className="mr-1.5 inline-block size-2 rounded-sm bg-[#a85c36]" />
                {shown.visitors} visiteur{shown.visitors > 1 ? "s" : ""}
              </p>
              <p className="text-[#8a9a92]">
                {shown.views} page{shown.views > 1 ? "s" : ""} vue{shown.views > 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
        <div className="mt-2 flex h-5 gap-[3px]">
          {daily.map((day, index) => (
            <span key={day.date} className="relative flex-1">
              {labelAt.has(index) && (
                <span
                  className={`absolute top-0 whitespace-nowrap text-[11px] text-[#8a9a92] ${
                    index === 0 ? "left-0" : index === daily.length - 1 ? "right-0" : "left-1/2 -translate-x-1/2"
                  }`}
                >
                  {dayFormat.format(parse(day.date))}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-semibold text-[#a85c36]">Voir le tableau jour par jour</summary>
        <div className="mt-3 max-h-72 overflow-auto rounded-xl border border-[#eef2ef]">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-[#f6f8f7] text-xs uppercase tracking-wider text-[#8a9a92]">
              <tr>
                <th className="px-3 py-2 font-semibold">Jour</th>
                <th className="px-3 py-2 text-right font-semibold">Visiteurs</th>
                <th className="px-3 py-2 text-right font-semibold">Pages vues</th>
              </tr>
            </thead>
            <tbody>
              {[...daily].reverse().map((day) => (
                <tr key={day.date} className="border-t border-[#eef2ef] text-[#16232a]">
                  <td className="px-3 py-2 capitalize">{longFormat.format(parse(day.date))}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{day.visitors}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{day.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
