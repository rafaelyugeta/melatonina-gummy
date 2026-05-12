import { Moon, Clock, Heart, Leaf } from "lucide-react";

const benefits = [
  { icon: Moon, title: "Qualidade do Sono", desc: "Auxilia na regulação do ciclo do sono para noites mais profundas e reparadoras." },
  { icon: Clock, title: "Pega no Sono Mais Rápido", desc: "Ajuda a reduzir o tempo para adormecer de forma natural." },
  { icon: Heart, title: "Promove Relaxamento", desc: "Contribui para a redução do estresse e ansiedade antes de dormir." },
  { icon: Leaf, title: "Vegana e Sem Açúcar", desc: "Fórmula 100% vegana, zero açúcar e com sabor delicioso." },
];

const Benefits = () => (
  <section className="container py-10">
    <h2 className="text-xl font-extrabold text-foreground text-center mb-1">
      Por que escolher <span className="text-primary">Melatonina em Gummy</span>?
    </h2>
    <p className="text-sm text-muted-foreground text-center mb-6">Fórmula natural para sono reparador e noites tranquilas</p>

    <div className="grid grid-cols-2 gap-3 mb-6">
      {benefits.map((b) => (
        <div key={b.title} className="bg-card rounded-xl p-4 text-center border border-border shadow-sm hover:border-primary/30 transition-colors">
          <b.icon className="w-8 h-8 text-foreground mx-auto mb-2" />
          <h3 className="font-bold text-sm text-foreground mb-1">{b.title}</h3>
          <p className="text-xs text-muted-foreground">{b.desc}</p>
        </div>
      ))}
    </div>

    <a href="#pricing-kits" onClick={(e) => { e.preventDefault(); document.getElementById('kit-destaque')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full bg-cta hover:bg-cta-hover text-cta-foreground font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cta/20">
      <Moon className="w-5 h-5" />QUERO DORMIR MELHOR AGORA
    </a>
    <p className="text-center text-xs text-muted-foreground mt-1.5">Apenas 15 unidades disponíveis com esse preço</p>
  </section>
);

export default Benefits;
