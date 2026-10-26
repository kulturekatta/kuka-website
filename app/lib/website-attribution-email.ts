import { cleanText, type WebsiteFormField } from "./website-forms";

// Internal notifications only. Omit missing values rather than claim "direct".
export function attributionEmailFields(body: object): WebsiteFormField[] {
  const source = body as Record<string, unknown>;
  const values: Array<[string, string, number]> = [
    ["Submission page", "sourcePage", 500],
    ["Original campaign landing page", "landingPage", 500],
    ["Original recorded referrer", "referrer", 500],
    ["Campaign attribution first recorded", "firstVisitAt", 80],
    ["UTM source", "utmSource", 160],
    ["UTM medium", "utmMedium", 160],
    ["UTM campaign", "utmCampaign", 200],
    ["UTM content", "utmContent", 200],
    ["UTM term", "utmTerm", 200],
    ["Meta click ID", "fbclid", 500],
  ];
  return values.map(([label, field, limit]) => ({ label, value: cleanText(source[field], limit) }))
    .filter((entry) => entry.value.length > 0);
}
