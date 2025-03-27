import Image from "next/image";
import { motion } from "framer-motion";

export function ThirdStep() {
  return (
    <motion.div
      className="w-full flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full aspect-[16/12]">
        <Image src="/third-step.png" alt="Método de presentear: na loja" fill className="object-cover" />
      </div>

      <div className="w-full px-6 flex flex-col gap-5">
        <h2 className="font-montserrat text-xl font-light leading-relaxed uppercase">Método de presentear: na loja</h2>

        <ul className="w-full flex flex-col gap-3 list-disc pl-5">
          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            Se todos os itens no seu carrinho tiverem link de compra, essa opção estará disponível.
          </li>

          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            No modal, haverá uma box com os detalhes do endereço para o cálculo do frete.
          </li>

          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            Acesse os links dos produtos na opção “ir para loja”, compre diretamente na loja e envie para o endereço
            indicado.
          </li>

          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            Assim que acessar o link de um item, ele será marcado com um check, indicando que foi comprado.
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
