import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "O que é a Melatonina em Gummy?", a: "É um suplemento alimentar em formato de gummy (bala de goma) que contém melatonina, o hormônio natural que regula o ciclo do sono." },
  { q: "Para que serve?", a: "Auxilia na regulação do sono, ajuda a pegar no sono mais rápido, melhora a qualidade do descanso e promove relaxamento." },
  { q: "Como devo tomar?", a: "A recomendação é consumir 1 a 2 gummies cerca de 30 minutos antes de dormir, ou conforme orientação profissional." },
  { q: "Em quanto tempo vejo resultados?", a: "Muitos usuários relatam melhora já nas primeiras noites. O uso contínuo potencializa os benefícios ao longo das semanas." },
  { q: "É vegana e sem açúcar?", a: "Sim! A fórmula é 100% vegana e zero açúcar, ideal para quem cuida da saúde." },
  { q: "Tem efeitos colaterais?", a: "A melatonina é um hormônio natural do corpo. Consulte um profissional de saúde em caso de dúvidas." },
  { q: "Pode ser usada todos os dias?", a: "Sim, desde que respeitada a recomendação de consumo." },
  { q: "Ajuda com a ansiedade?", a: "Sim, contribui para a redução do estresse e ansiedade, facilitando o relaxamento antes de dormir." },
  { q: "É um medicamento?", a: "Não. Este produto é um suplemento alimentar e não é um medicamento." },
  { q: "Tem contraindicações?", a: "Gestantes, lactantes e crianças devem consultar um profissional de saúde antes do uso." },
  { q: "Qual o sabor?", a: "As gummies possuem sabor natural agradável, fáceis de consumir e sem gosto de remédio." },
];

const FAQ = () => (
  <section className="bg-muted py-10">
    <div className="container">
      <h2 className="text-xl font-extrabold text-foreground text-center mb-6">Perguntas Frequentes</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border border-border px-4">
            <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline hover:text-primary">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
