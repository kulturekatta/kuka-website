// First-party inquiry attribution, shared by every website form.
// This is not an advertising pixel and does not load third-party scripts.
export const ATTRIBUTION_STORAGE_KEY = "kuka-growth-attribution-v1";
const MAX_AGE = 30 * 24 * 60 * 60 * 1000;

const campaignKeys = {
  utmSource: "utm_source",
  utmMedium: "utm_medium",
  utmCampaign: "utm_campaign",
  utmContent: "utm_content",
  utmTerm: "utm_term",
  fbclid: "fbclid",
} as const;

type CampaignKey = keyof typeof campaignKeys;
export type InquiryAttribution = Record<CampaignKey, string> & {
  landingPage: string;
  firstVisitAt: string;
  referrer: string;
  savedAt: number;
};

export function captureInquiryAttribution(): InquiryAttribution {
  const params = new URLSearchParams(window.location.search);
  const hasCampaign = Object.values(campaignKeys).some((key) => params.has(key));
  let previous: Partial<InquiryAttribution> = {};
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (raw) {
      const value = JSON.parse(raw) as Partial<InquiryAttribution>;
      if (typeof value.savedAt === "number" && Date.now() - value.savedAt < MAX_AGE) previous = value;
    }
  } catch { /* browsers may block storage */ }

  const firstPage = `${window.location.pathname}${window.location.search}`;
  const firstVisit = new Date().toISOString();
  const result = {} as InquiryAttribution;
  for (const [field, parameter] of Object.entries(campaignKeys) as [CampaignKey, string][]) {
    result[field] = hasCampaign ? (params.get(parameter) || "") : (previous[field] || "");
  }
  result.landingPage = hasCampaign ? firstPage : (previous.landingPage || firstPage);
  result.firstVisitAt = hasCampaign ? firstVisit : (previous.firstVisitAt || firstVisit);
  result.referrer = hasCampaign ? document.referrer : (previous.referrer || document.referrer);
  result.savedAt = hasCampaign || !previous.savedAt ? Date.now() : previous.savedAt;
  try { window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(result)); } catch { /* optional storage */ }
  return result;
}

export function getInquiryAttributionPayload() {
  const { savedAt: _savedAt, ...attribution } = captureInquiryAttribution();
  void _savedAt;
  return { ...attribution, sourcePage: `${window.location.pathname}${window.location.search}` };
}
