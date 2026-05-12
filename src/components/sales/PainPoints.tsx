import { X, CheckCircle } from "lucide-react";

const problems = [
  "Dificuldade para pegar no sono e insônia constante",
  "Cansaço ao acordar mesmo após horas de sono",
  "Ansiedade e pensamentos acelerados na hora de dormir",
  "Sono leve e interrompido durante a noite",
  "Falta de relaxamento e estresse acumulado",
];

const PainPoints = () => (
  <section className="bg-muted py-10">
    <div className="container">
      <h2 className="text-xl font-extrabold text-foreground text-center mb-6">
        Você sofre com noites mal dormidas e cansaço constante?
      </h2>
      <div className="space-y-3 mb-6">
        {problems.map((p) => (
          <div key={p} className="flex items-start gap-3 bg-card rounded-lg p-3 shadow-sm border border-border">
            <X className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{p}</span>
          </div>
        ))}
      </div>
      <div className="bg-[#F8F6FD] border border-[#E0D8F0] rounded-xl p-4 flex items-center gap-3">
        <CheckCircle className="w-6 h-6 text-[#22C55E] shrink-0" />
        <p className="text-sm font-bold text-foreground">A Melatonina em Gummy ajuda a regular seu sono e promover noites tranquilas ✓</p>
      </div>
    </div>
  </section>
);

export default PainPoints;
