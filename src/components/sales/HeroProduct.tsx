import { useState, useEffect } from "react";
import { Star, Eye, ThumbsUp, Users, ChevronRight, ChevronLeft, Moon, Tag, AlertTriangle } from "lucide-react";
import carouselImg1 from "@/assets/carousel-1.jpg";
import carouselImg2 from "@/assets/carousel-2.jpg";
import carouselImg3 from "@/assets/carousel-3.jpg";
import carouselImg4 from "@/assets/carousel-4.jpg";
import carouselImg5 from "@/assets/carousel-5.jpg";

const carouselItems = [carouselImg1, carouselImg3, carouselImg5, carouselImg4, carouselImg2];

const ProductCarousel = () => {
  const [current, setCurrent] = useState(0);
  const total = carouselItems.length;
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="relative bg-white rounded-xl p-4 mb-4 overflow-hidden border border-border" style={{ minHeight: 380 }}>
      <div className="relative w-full" style={{ minHeight: 350 }}>
        {carouselItems.map((src, i) => (
          <div key={i} className={`w-full flex items-center justify-center ${i === current ? "block" : "hidden"}`} style={{ minHeight: 350 }}>
            <img src={src} alt={`Produto ${i + 1}`} className="object-contain max-h-[350px] w-full mx-auto" loading="eager" />
          </div>
        ))}
      </div>
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full w-8 h-8 flex items-center justify-center shadow"><ChevronLeft className="w-4 h-4 text-foreground" /></button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background rounded-full w-8 h-8 flex items-center justify-center shadow"><ChevronRight className="w-4 h-4 text-foreground" /></button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {carouselItems.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted-foreground/30"}`} />))}
      </div>
    </div>
  );
};

const HeroProduct = () => {
  const [viewers, setViewers] = useState(127);
  const [buyers, setBuyers] = useState(18);

  useEffect(() => {
    const tick = () => {
      const change = [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)];
      const direction = Math.random() > 0.45 ? 1 : -1;
      setViewers(prev => Math.max(100, Math.min(160, prev + change * direction)));
      timeout = setTimeout(tick, 2000 + Math.random() * 4000);
    };
    let timeout = setTimeout(tick, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const tick = () => {
      const change = [1, 2][Math.floor(Math.random() * 2)];
      const direction = Math.random() > 0.5 ? 1 : -1;
      setBuyers(prev => Math.max(12, Math.min(25, prev + change * direction)));
      timeout2 = setTimeout(tick, 3000 + Math.random() * 2000);
    };
    let timeout2 = setTimeout(tick, 4000);
    return () => clearTimeout(timeout2);
  }, []);

  const rating = 4.9, reviews = 1847, price = 39.90, originalPrice = 54.90, discount = 27, stock = 15;

  return (
    <section className="container py-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 bg-[#22C35D] rounded-full animate-pulse" />
        <Eye className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground"><strong className="text-foreground">{viewers}</strong> vendo agora</span>
      </div>

      <ProductCarousel />

      <div className="bg-muted rounded-lg p-3 flex items-center gap-2 mb-4 border border-border">
        <ThumbsUp className="w-5 h-5 text-[#22C55E]" />
        <span className="text-sm">Restam apenas <strong className="text-primary">{stock} unidades</strong> em estoque!</span>
      </div>

      <div className="flex items-center gap-3 mb-2 flex-wrap">
        <span className="bg-[#6B46C1] text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap">60 GUMMIES · SABOR NATURAL</span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-star text-star" />))}
          <span className="text-sm text-muted-foreground ml-1">{rating} ({reviews.toLocaleString()} avaliações)</span>
        </div>
      </div>

      <h1 className="text-lg font-extrabold text-black mb-1">Melatonina em Gummy – Sono e Relaxamento</h1>
      <p className="text-muted-foreground text-sm mb-4">Durma melhor, acorde renovado. Fórmula vegana e sem açúcar.</p>

      <div className="bg-[#2D1B69] rounded-lg p-3 flex items-center justify-between mb-4 cursor-pointer hover:bg-[#3A2380] transition-colors">
        <div className="flex items-center gap-2 text-white text-sm font-semibold"><Users className="w-4 h-4" />+1.847 pessoas já compraram</div>
        <ChevronRight className="w-4 h-4 text-white" />
      </div>

      <div className="relative mb-4 mt-6">
        <div className="absolute right-0 -top-6"><span className="bg-[#6B46C1] text-white text-xs font-bold px-3 py-1.5 rounded-full">ECONOMIZE 27%</span></div>
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-foreground">R$ {price.toFixed(2).replace(".", ",")}</span>
          <span className="text-lg text-muted-foreground line-through">R$ {originalPrice.toFixed(2).replace(".", ",")}</span>
          <span className="bg-[#6B46C1] text-white text-xs font-bold px-2 py-1 rounded">-{discount}%</span>
        </div>
        <div className="flex items-center gap-3 mt-1 text-sm">
          <span className="flex items-center gap-1 text-foreground"><Tag className="w-3.5 h-3.5" /> Menor preço do ano</span>
          <span className="flex items-center gap-1 text-foreground"><AlertTriangle className="w-3.5 h-3.5" /> Últimas unidades!</span>
        </div>
      </div>

      <a href="#pricing-kits" onClick={(e) => { e.preventDefault(); document.getElementById('kit-destaque')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full bg-cta hover:bg-cta-hover text-cta-foreground font-bold text-lg py-4 rounded-xl animate-pulse-glow transition-colors flex items-center justify-center gap-2 mb-2 shadow-lg shadow-cta/20">
        <Moon className="w-5 h-5" />QUERO DORMIR MELHOR AGORA
      </a>
      <p className="text-center text-sm text-foreground font-semibold mb-4">Frete Grátis + Bônus Exclusivos</p>
      <p className="text-center text-sm text-muted-foreground"><Users className="w-4 h-4 inline mr-1" /><strong className="text-foreground">{buyers} pessoas</strong> estão finalizando a compra agora</p>
    </section>
  );
};

export default HeroProduct;
