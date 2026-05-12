import { ShieldCheck } from "lucide-react";

const Footer = () => (
  <footer className="bg-card text-foreground/80 py-8 pb-24 border-t border-border">
    <div className="container text-center">
      <h3 className="text-lg font-bold text-foreground mb-2">Melatonina em Gummy Guday</h3>
      <p className="text-xs mb-6 text-muted-foreground">Suplementos naturais para seu sono e bem-estar.</p>

      <div className="flex items-center justify-center gap-2 mb-4 text-xs text-muted-foreground">
        <ShieldCheck className="w-4 h-4 text-primary" />
        Compra 100% segura · Dados protegidos
      </div>

      <p className="text-xs text-muted-foreground/50">© 2024 Melatonina em Gummy Guday. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;
