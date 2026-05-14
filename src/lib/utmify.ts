const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "utmify_utms";
const UTMIFY_TRACKING_URL = "https://tracking.utmify.com.br/tracking/v1/events";

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export const captureUtms = (): UtmParams => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const fromUrl: UtmParams = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) fromUrl[k] = v;
  });
  if (Object.keys(fromUrl).length > 0) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {}
    return fromUrl;
  }
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as UtmParams;
  } catch {}
  return {};
};

/** Reads the lead object that pixel.js stores in localStorage */
const getPixelLead = (): Record<string, any> => {
  try {
    const raw = localStorage.getItem("lead");
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
};

/** Reads _fbp cookie */
const getFbp = (): string => {
  try {
    const match = document.cookie.match(/(?:^|;\s*)_fbp=([^;]*)/);
    return match ? match[1] : "";
  } catch {
    return "";
  }
};

/** Reads _fbc cookie or builds from fbclid URL param */
const getFbc = (): string => {
  try {
    const match = document.cookie.match(/(?:^|;\s*)_fbc=([^;]*)/);
    if (match) return match[1];
    const params = new URLSearchParams(window.location.search);
    const fbclid = params.get("fbclid");
    if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
  } catch {}
  return "";
};

export const trackPurchase = async (params: {
  orderId: string;
  value: number;
  email?: string;
  phone?: string;
  name?: string;
}) => {
  if (typeof window === "undefined") return;

  const pixelId = (window as any).pixelId;
  if (!pixelId) {
    console.warn("UTMify: pixelId not found on window");
    return;
  }

  // Get the lead data that pixel.js already stored
  const storedLead = getPixelLead();

  // Build the lead object matching pixel.js internal format
  const lead: Record<string, any> = {
    ...storedLead,
    pixelId,
    userAgent: navigator.userAgent,
    locale: navigator.language,
    fbp: storedLead.fbp || getFbp(),
    fbc: storedLead.fbc || getFbc(),
  };

  // Add customer data if provided
  if (params.email) lead.email = params.email;
  if (params.phone) lead.phone = params.phone;
  if (params.name) {
    const parts = params.name.trim().split(/\s+/);
    lead.firstName = parts[0] || "";
    lead.lastName = parts.slice(1).join(" ") || "";
  }

  // Add UTM parameters
  const utms = captureUtms();
  if (Object.keys(utms).length > 0) {
    lead.parameters = JSON.stringify(utms);
  }

  // Build the event payload matching pixel.js format
  const payload = {
    type: "Purchase",
    lead,
    event: {
      pageTitle: document.title,
      sourceUrl: window.location.href,
    },
    purchase: {
      orderId: params.orderId,
      value: params.value,
      currency: "BRL",
    },
  };

  try {
    const response = await fetch(UTMIFY_TRACKING_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("UTMify Purchase tracked successfully", data);
      // Update lead in localStorage if server returns updated lead
      if (data?.lead?._id) {
        try {
          localStorage.setItem("lead", JSON.stringify({ ...lead, _id: data.lead._id }));
        } catch {}
      }
    } else {
      console.warn("UTMify Purchase tracking failed:", response.status);
    }
  } catch (e) {
    console.warn("UTMify trackPurchase error:", e);
  }

  // Also fire Facebook Pixel if present
  try {
    const w = window as any;
    if (typeof w.fbq === "function") {
      w.fbq("track", "Purchase", { value: params.value, currency: "BRL" });
    }
  } catch {}
};
