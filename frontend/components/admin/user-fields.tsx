import { FormField, inputClassName } from "@/components/admin/form-field";
import { ADMIN_ROLES, type AdminUser } from "@/types/admin";

const roleLabels: Record<string, string> = { admin: "Administrateur", editor: "Éditeur", commercial: "Commercial" };
const roleDescriptions: Record<string, string> = {
  admin: "Accès complet à toutes les sections.",
  editor: "Produits, services, réalisations, actualités.",
  commercial: "Messages et demandes de devis.",
};

export function UserFields({ user }: { user?: AdminUser }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Identifiant" htmlFor="username" required>
          <input id="username" name="username" required defaultValue={user?.username} className={inputClassName} />
        </FormField>
        <FormField label="E-mail" htmlFor="email" required>
          <input id="email" name="email" type="email" required defaultValue={user?.email} className={inputClassName} />
        </FormField>
        <FormField label="Prénom" htmlFor="first_name">
          <input id="first_name" name="first_name" defaultValue={user?.first_name} className={inputClassName} />
        </FormField>
        <FormField label="Nom" htmlFor="last_name">
          <input id="last_name" name="last_name" defaultValue={user?.last_name} className={inputClassName} />
        </FormField>
      </div>

      <FormField label="Mot de passe" htmlFor="password" hint={user ? "Laissez vide pour conserver le mot de passe actuel." : "Requis pour permettre la connexion."}>
        <input id="password" name="password" type="password" required={!user} className={inputClassName} />
      </FormField>

      <fieldset>
        <legend className="text-sm font-medium text-[#16232a]">Rôle</legend>
        <div className="mt-2 grid gap-2">
          {ADMIN_ROLES.map((role) => (
            <label key={role} className="flex items-start gap-3 rounded-lg border border-[#dce5df] p-3 has-[:checked]:border-[#a85c36] has-[:checked]:bg-[#eaf2f2]">
              <input type="radio" name="role" value={role} defaultChecked={(user?.role ?? "editor") === role} className="mt-0.5 text-[#a85c36] focus:ring-[#a85c36]" />
              <span>
                <span className="block text-sm font-semibold text-[#16232a]">{roleLabels[role]}</span>
                <span className="block text-xs text-[#526259]">{roleDescriptions[role]}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex items-center gap-3 text-sm font-medium text-[#16232a]">
        <input type="checkbox" name="is_active" value="true" defaultChecked={user?.is_active ?? true} className="size-4 rounded border-[#dce5df] text-[#a85c36] focus:ring-[#a85c36]" />
        Compte actif
      </label>
    </>
  );
}
