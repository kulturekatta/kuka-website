import { permanentRedirect } from "next/navigation";

// Preserve old links without creating duplicate discoverable content.
export default function LegacyDiscoverPage() {
  permanentRedirect("/experiences");
}
