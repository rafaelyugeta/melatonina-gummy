const ingredients = [
  { num: "01", name: "Melatonina", desc: "Hormônio natural que regula o ciclo sono-vigília e melhora a qualidade do descanso." },
  { num: "02", name: "Zero Açúcar", desc: "Formulação sem açúcar, ideal para quem cuida da saúde e quer um sono melhor." },
  { num: "03", name: "Fórmula Vegana", desc: "100% vegana, sem ingredientes de origem animal, com selo de qualidade." },
  { num: "04", name: "Antioxidantes Naturais", desc: "Ação antioxidante que auxilia na proteção celular durante o sono reparador." },
  { num: "05", name: "Sabor Natural", desc: "Gummies com sabor agradável, fáceis de consumir e sem gosto de remédio." },
  { num: "06", name: "Absorção Rápida", desc: "Formato gummy permite absorção mais eficiente que cápsulas tradicionais." },
];

const Ingredients = () => (
  <section className="py-10" style={{ background: "linear-gradient(to bottom, hsl(262, 40%, 10%), hsl(262, 60%, 30%))" }}>
    <div className="container">
      <h2 className="text-xl font-extrabold text-white text-center mb-1">
        Fórmula completa para <span className="text-primary">noites tranquilas</span>
      </h2>
      <p className="text-sm text-white/70 text-center mb-6">
        Ingredientes selecionados para sono, relaxamento e bem-estar
      </p>

      <div className="space-y-3">
        {ingredients.map((ing) => (
          <div key={ing.num} className="bg-background/40 backdrop-blur-sm rounded-xl p-4 flex items-start gap-4 border border-primary/20">
            <span className="text-2xl font-black text-primary">{ing.num}</span>
            <div className="flex-1">
              <span className="font-bold text-white text-sm">{ing.name}</span>
              <p className="text-xs text-white/70 mt-1">{ing.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Ingredients;
