const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "utmify_utms";

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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {}
    return fromUrl;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as UtmParams;
  } catch {}
  return {};
};

/**
 * Dispara eventos de compra no frontend.
 *
 * NOTA: O rastreamento de compras da UTMify é feito via Webhook/Postback
 * configurado diretamente entre a Fruitfy e a UTMify (server-to-server).
 * O pixel da UTMify (pixel.js) rastreia apenas eventos de navegação
 * (PageView, InitiateCheckout, etc.) e não expõe API pública para Purchase.
 *
 * Esta função dispara apenas o Facebook Pixel (se instalado).
 */
export const trackPurchase = (params: {
  orderId: string;
  value: number;
  email?: string;
  phone?: string;
  name?: string;
}) => {
  if (typeof window === "undefined") return;

  // Facebook Pixel
  try {
    const w = window as any;
    if (typeof w.fbq === "function") {
      w.fbq("track", "Purchase", { value: params.value, currency: "BRL" });
    }
  } catch (e) {
    console.warn("trackPurchase error:", e);
  }
};
