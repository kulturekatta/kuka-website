import SemanticIcon, { type SemanticIconSize } from "@/app/components/SemanticIcon";

export default function ExperienceGlyph({ icon, label, size = "section", className = "" }: {
  icon: string;
  label: string;
  size?: SemanticIconSize;
  className?: string;
}) {
  return <SemanticIcon icon={icon} label={label} size={size} className={className} />;
}
