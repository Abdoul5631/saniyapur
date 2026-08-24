import type { ReactNode } from "react";
import { EmptyState } from "@/components/admin/empty-state";

export type DataTableColumn<T> = { header: string; render: (row: T, index: number) => ReactNode; className?: string };

export function DataTable<T extends { id: number }>({ columns, rows, emptyTitle, emptyDescription }: { columns: DataTableColumn<T>[]; rows: T[]; emptyTitle: string; emptyDescription?: string }) {
  if (!rows.length) {
    return <div className="rounded-2xl border border-[#dce5df] bg-white"><EmptyState title={emptyTitle} description={emptyDescription} /></div>;
  }
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#dce5df] bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-[#dce5df] text-[#526259]">
          <tr>{columns.map((column) => <th key={column.header} className={`whitespace-nowrap px-5 py-3 font-medium ${column.className ?? ""}`}>{column.header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id} className="border-b border-[#eef2ef] last:border-0">
              {columns.map((column) => <td key={column.header} className={`px-5 py-4 ${column.className ?? ""}`}>{column.render(row, index)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
