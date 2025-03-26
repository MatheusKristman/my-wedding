import Image from "next/image";
import { motion } from "framer-motion";

export function FourthStep() {
  return (
    <motion.div
      className="w-full flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full aspect-video">
        <Image src="/fourth-step.png" alt="Método de presentear: pix" fill />
      </div>

      <div className="w-full px-6 flex flex-col gap-5">
        <h2 className="font-montserrat text-xl font-light leading-relaxed uppercase">Método de presentear: pix</h2>

        <ul className="w-full flex flex-col gap-3 list-disc pl-5">
          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            Se houver itens sem link de compra, apenas a opção Pix estará disponível.
          </li>

          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            Escolha &quot;Pix&quot; para visualizar o QR Code e o e-mail do Pix.
          </li>

          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            Faça o pagamento de acordo com o valor total dos itens.
          </li>

          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            Após concluir o pagamento, clique em &quot;Presentear&quot; para confirmar a compra.
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
