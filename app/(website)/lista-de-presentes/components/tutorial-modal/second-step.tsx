import Image from "next/image";
import { motion } from "framer-motion";

export function SecondStep() {
  return (
    <motion.div
      className="w-full flex flex-col gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full aspect-video">
        <Image src="/second-step.png" alt="Adicionando itens ao carrinho" fill />
      </div>

      <div className="w-full px-6 flex flex-col gap-5">
        <h2 className="font-montserrat text-xl font-light leading-relaxed uppercase">Adicionando itens ao carrinho</h2>

        <ul className="w-full flex flex-col gap-3 list-disc pl-5">
          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            Navegue pela nossa lista de presentes e escolha os itens que deseja nos presentear.
          </li>

          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            Clique no botão &quot;presentear&quot; para incluir os itens selecionados.
          </li>

          <li className="font-montserrat text-sm text-foreground/70 font-light leading-normal uppercase">
            Selecione a forma de presentear e preencha os campos para prosseguir.
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
