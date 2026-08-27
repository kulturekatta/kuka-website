import SemanticIcon, { type SemanticIconSize } from "./SemanticIcon";

type IconLeadAlign = "start" | "center";

type IconLeadProps = {
  icon: string;
  label: string;
  size?: Extract<SemanticIconSize, "page" | "section">;
  align?: IconLeadAlign;
  className?: string;
};

export default function IconLead({
  icon,
  label,
  size = "section",
  align = "start",
  className = "",
}: IconLeadProps) {
  return (
    <div
      data-kk-icon-lead=""
      data-kk-icon-lead-size={size}
      data-kk-icon-lead-align={align}
      className={`kk-icon-lead kk-icon-lead--${size} kk-icon-lead--${align} ${className}`.trim()}
    >
      <SemanticIcon icon={icon} label={label} size={size} />
    </div>
  );
}
