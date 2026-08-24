export function PublishedToggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 text-sm font-medium text-[#16232a]">
      <input type="checkbox" name="published" value="true" defaultChecked={defaultChecked} className="size-4 rounded border-[#dce5df] text-[#a85c36] focus:ring-[#a85c36]" />
      Publier sur le site public
    </label>
  );
}
