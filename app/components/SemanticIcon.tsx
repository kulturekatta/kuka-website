import { resolveSemanticIcon } from "../data/semanticIconRegistry";

export type SemanticIconSize = "page" | "section" | "card" | "compact";

type SemanticIconProps = {
  icon: string;
  label: string;
  size?: SemanticIconSize;
  className?: string;
};

export default function SemanticIcon({
  icon,
  label,
  size = "section",
  className = "",
}: SemanticIconProps) {
  const resolved = resolveSemanticIcon(icon, label);
  const parts = resolved.icon.split(" ").filter(Boolean);
  const isCompound = parts.length > 1;

  return (
    <span
      role="img"
      aria-label={label}
      data-kk-icon={resolved.icon}
      data-kk-icon-key={resolved.key}
      data-kk-icon-label={label}
      data-kk-icon-size={size}
      data-kk-icon-compound={isCompound ? "true" : "false"}
      className={`kk-icon kk-icon--${size} ${
        isCompound ? "kk-icon--compound" : ""
      } ${className}`.trim()}
    >
      {isCompound ? (
        <span className="kk-icon__compound" aria-hidden="true">
          {parts.map((part, index) => (
            <span key={`${part}-${index}`} className="kk-icon__part">
              {part}
            </span>
          ))}
        </span>
      ) : (
        resolved.icon
      )}
    </span>
  );
}
