import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ChevronLeft, User, Mail, FileText, Phone, MapPin, Hash, Building, Home, CreditCard, ShieldCheck, Lock, QrCode, Clock, CheckCircle2, Smartphone } from "lucide-react";
import kitImg1 from "@/assets/kit-1.jpg";
import kitImg2 from "@/assets/kit-2.jpg";
import kitImg3 from "@/assets/kit-3.jpg";

const products: Record<string, { title: string; price: number; originalPrice: number; image: string }> = {
  "1": { title: "1 Melatonina Gummy", price: 39.90, originalPrice: 54.90, image: kitImg1 },
  "2": { title: "2 Melatonina Gummy", price: 64.90, originalPrice: 109.90, image: kitImg2 },
  "3": { title: "3 Melatonina Gummy + Brinde", price: 84.90, originalPrice: 164.70, image: kitImg3 },
};

const formatBRL = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;

const Checkout = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const kit = params.get("kit") || "1";
  const product = products[kit] || products["1"];

  const [form, setForm] = useState({ nome: "", email: "", cpf: "", celular: "", cep: "", estado: "", cidade: "", bairro: "", rua: "", numero: "", complemento: "" });
  const [pixGenerated, setPixGenerated] = useState(false);
  const [pixCode, setPixCode] = useState("");

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const maskCPF = (v: string) => v.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2").slice(0, 14);
  const maskPhone = (v: string) => { const d = v.replace(/\D/g, ""); if (d.length <= 2) return `(${d}`; if (d.length <= 7) return `(${d.slice(0,2)}) ${d.slice(2)}`; return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7,11)}`; };
  const maskCEP = (v: string) => v.replace(/\D/g, "").replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);

  const handleCEP = async (cep: string) => {
    const masked = maskCEP(cep);
    update("cep", masked);
    const digits = masked.replace(/\D/g, "");
    if (digits.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setForm((f) => ({ ...f, cep: masked, estado: data.uf || "", cidade: data.localidade || "", bairro: data.bairro || "", rua: data.logradouro || "" }));
        }
      } catch { /* ignore */ }
    }
  };

  const handleGeneratePix = () => {
    if (!form.nome || !form.email || !form.cpf || !form.celular) return;
    const code = `00020126580014br.gov.bcb.pix0136${Date.now()}520400005303986540${product.price.toFixed(2)}5802BR5925GUDAY SUPLEMENTOS LTDA6009SAO PAULO62070503***6304`;
    setPixCode(code);
    setPixGenerated(true);
  };

  const estados = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

  return (
    <div className="min-h-screen bg-[#f0f2f5] max-w-[768px] mx-auto">
      {/* Back button */}
      <div className="px-4 py-3">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Voltar
        </button>
      </div>

      {/* Product summary */}
      <div className="mx-4 mb-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <p className="text-[#00bcd4] text-sm font-semibold mb-2">Você está comprando:</p>
        <div className="flex items-center gap-3">
          <img src={product.image} alt={product.title} className="w-12 h-12 rounded-lg object-cover" />
          <div>
            <p className="font-semibold text-gray-800 text-sm">{product.title}</p>
            <p className="font-bold text-gray-900">{formatBRL(product.price)}</p>
          </div>
        </div>
      </div>

      {/* Personal data */}
      <div className="mx-4 mb-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 bg-[#00bcd4] text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
          <h2 className="font-bold text-gray-800">Dados pessoais</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Nome completo</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Digite seu nome completo" value={form.nome} onChange={(e) => update("nome", e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="email" placeholder="Digite seu melhor e-mail" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">CPF</label>
            <input type="text" placeholder="000.000.000-00" value={form.cpf} onChange={(e) => update("cpf", maskCPF(e.target.value))} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors" />
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Celular</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="(99) 99999-9999" value={form.celular} onChange={(e) => update("celular", maskPhone(e.target.value))} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mx-4 mb-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 bg-[#00bcd4] text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
          <h2 className="font-bold text-gray-800">Endereço</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">CEP</label>
              <input type="text" placeholder="Digite o CEP" value={form.cep} onChange={(e) => handleCEP(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">Estado</label>
              <select value={form.estado} onChange={(e) => update("estado", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors bg-white text-gray-600">
                <option value="">Selecione...</option>
                {estados.map((uf) => (<option key={uf} value={uf}>{uf}</option>))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">Cidade</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Digite a cidade" value={form.cidade} onChange={(e) => update("cidade", e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">Bairro</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Digite o bairro" value={form.bairro} onChange={(e) => update("bairro", e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors" />
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 font-medium mb-1 block">Rua</label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Digite o nome da rua" value={form.rua} onChange={(e) => update("rua", e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">Número</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Nº" value={form.numero} onChange={(e) => update("numero", e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">Complemento</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Apto, Bloco, etc" value={form.complemento} onChange={(e) => update("complemento", e.target.value)} className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4]/20 transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="mx-4 mb-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-[#00bcd4] text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <h2 className="font-bold text-gray-800">Pagamento</h2>
          </div>
          <span className="text-xs text-gray-400">Pix</span>
        </div>

        {/* Pix selected */}
        <div className="border-2 border-[#00bcd4] rounded-xl p-4 flex items-center justify-center gap-2 mb-5 bg-[#00bcd4]/5">
          <CreditCard className="w-5 h-5 text-[#00bcd4]" />
          <span className="text-[#00bcd4] font-semibold text-sm">Pix</span>
        </div>

        <h3 className="font-bold text-gray-800 mb-3">Pague no Pix</h3>

        <div className="space-y-4 mb-5">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#00bcd4] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[#00bcd4] font-bold text-xs">IMEDIATO</p>
              <p className="text-xs text-gray-500">Ao selecionar a opção Gerar Pix o código para pagamento estará disponível.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Smartphone className="w-5 h-5 text-[#00bcd4] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[#00bcd4] font-bold text-xs">PAGAMENTO SIMPLES</p>
              <p className="text-xs text-gray-500">Para pagar basta abrir o aplicativo do seu banco, procurar pelo Pix e escanear o QRcode.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#00bcd4] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[#00bcd4] font-bold text-xs">100% SEGURO</p>
              <p className="text-xs text-gray-500">O Pix foi desenvolvido pelo Banco Central para facilitar suas compras e é 100% seguro.</p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#00bcd4] font-bold text-sm">Total:</span>
          <span className="text-gray-400 line-through text-sm">{formatBRL(product.originalPrice)}</span>
          <span className="text-[#00bcd4] font-bold text-lg">{formatBRL(product.price)}</span>
        </div>

        {!pixGenerated ? (
          <button onClick={handleGeneratePix} className="w-full bg-[#00bcd4] hover:bg-[#00a5bb] text-white font-bold py-4 rounded-xl transition-colors text-sm shadow-lg">
            Gerar Pix
          </button>
        ) : (
          <div className="space-y-4">
            {/* QR Code placeholder */}
            <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <QrCode className="w-32 h-32 text-gray-700" />
              <p className="text-xs text-gray-500 text-center">Escaneie o QR Code acima com o app do seu banco</p>
            </div>
            {/* Pix copy-paste */}
            <div>
              <label className="text-xs text-gray-500 font-medium mb-1 block">Ou copie o código Pix:</label>
              <div className="flex gap-2">
                <input type="text" readOnly value={pixCode} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-xs bg-gray-50 text-gray-600 truncate" />
                <button onClick={() => navigator.clipboard.writeText(pixCode)} className="px-4 py-2.5 bg-[#00bcd4] text-white text-xs font-bold rounded-lg hover:bg-[#00a5bb] transition-colors whitespace-nowrap">
                  Copiar
                </button>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500">Aguardando pagamento...</p>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-3">Criptografado e ambiente 100% seguro.</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-6 py-6 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Compra segura
        </div>
        <div className="flex items-center gap-1.5">
          <Lock className="w-4 h-4" /> Dados protegidos
        </div>
      </div>
    </div>
  );
};

export default Checkout;
