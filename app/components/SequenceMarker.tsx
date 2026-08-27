type SequenceMarkerProps = {
  index: number;
  label: string;
  className?: string;
};

export default function SequenceMarker({
  index,
  label,
  className = "",
}: SequenceMarkerProps) {
  const value = String(index + 1).padStart(2, "0");

  return (
    <span
      role="img"
      aria-label={`${label}, item ${index + 1}`}
      data-kk-sequence={value}
      className={`kk-sequence-marker ${className}`.trim()}
    >
      {value}
    </span>
  );
}
