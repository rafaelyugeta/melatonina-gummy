import { useNavigate } from "react-router-dom";
import { Moon, ShieldCheck } from "lucide-react";
import kitImg1 from "@/assets/kit-1.jpg";
import kitImg2 from "@/assets/kit-2.jpg";
import kitImg3 from "@/assets/kit-3.jpg";

const kits = [
  { badge: "1 UNIDADE", title: "1 Melatonina Gummy", subtitle: "60 gummies para noites tranquilas e sono reparador", price: 39.90, originalPrice: 54.90, discount: 27, perUnit: null, highlight: false, extraBadge: null, image: kitImg1, kit: "1" },
  { badge: "MAIS VENDIDO — MAIOR ECONOMIA", title: "2 Melatonina Gummy", subtitle: "Mais economia para uso contínuo e melhores resultados", price: 64.90, originalPrice: 109.90, discount: 41, perUnit: 32.45, highlight: true, extraBadge: "MELHOR CUSTO-BENEFÍCIO", image: kitImg2, kit: "2" },
  { badge: "COMBO COMPLETO + BRINDE", title: "3 Melatonina Gummy + Brinde", subtitle: "Combo completo para sono profundo + brinde exclusivo", price: 84.90, originalPrice: 164.70, discount: 48, perUnit: null, highlight: false, extraBadge: null, image: kitImg3, kit: "3" },
];

const PricingKits = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing-kits" className="container py-10">
      <h2 className="text-xl font-extrabold text-foreground text-center mb-1">Escolha seu Kit Ideal</h2>
      <p className="text-sm text-muted-foreground text-center mb-6">Quanto mais frascos, <strong className="text-foreground">maior a economia</strong></p>

      <div className="space-y-4">
        {kits.map((kit) => (
          <div key={kit.title} id={kit.highlight ? "kit-destaque" : undefined} className={`rounded-2xl border-2 p-4 relative bg-card shadow-sm ${kit.highlight ? "border-[#2D1B69] shadow-lg shadow-[#2D1B69]/10" : "border-border"}`}>
            <span className="bg-[#2D1B69] text-white text-[10px] font-bold px-2.5 py-1 rounded-full absolute -top-3 left-4">{kit.badge}</span>
            {kit.extraBadge && (<span className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-[11px] font-bold px-2.5 py-1 rounded-full mt-3 mb-1">{kit.extraBadge}</span>)}
            <div className={`${kit.extraBadge ? "mt-1" : "mt-2"}`}>
              <div className="flex justify-center mb-3"><img src={kit.image} alt={kit.title} className="object-contain max-h-[180px] w-auto rounded-2xl" /></div>
              <div>
                <h3 className="font-bold text-foreground">{kit.title}</h3>
                <p className="text-xs text-muted-foreground">{kit.subtitle}</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xl font-black text-foreground">R$ {kit.price.toFixed(2).replace(".", ",")}</span>
                  <span className="text-xs bg-[#6B46C1] text-white font-bold px-1.5 py-0.5 rounded">-{kit.discount}% OFF</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  <span className="line-through">R$ {kit.originalPrice.toFixed(2).replace(".", ",")}</span>
                  {kit.perUnit && <span>(R$ {kit.perUnit.toFixed(2).replace(".", ",")}/un)</span>}
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs">
                  <span className="text-[#22C35D] font-semibold">✓ Frete Grátis</span>
                  <span className="text-muted-foreground">Entrega rápida</span>
                </div>
              </div>
            </div>
            <button onClick={() => navigate(`/checkout?kit=${kit.kit}`)} className="w-full mt-3 font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground animate-pulse-glow shadow-lg shadow-cta/20">
              <Moon className="w-4 h-4" />COMPRAR AGORA
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-foreground" />Pagamento 100% seguro · Seus dados protegidos
      </div>
    </section>
  );
};

export default PricingKits;
