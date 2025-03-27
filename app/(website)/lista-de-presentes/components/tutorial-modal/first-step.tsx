import { motion } from "framer-motion";

export function FirstStep() {
  return (
    <motion.div
      className="w-full flex flex-col items-center gap-5 pt-9 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 className="font-fonde text-2xl md:text-4xl text-center max-w-[250px] md:max-w-sm">
        Bem-vindo à nossa Lista de Presentes!
      </motion.h1>

      <p className="font-montserrat text-center text-sm sm:text-xl text-primary/50 font-light uppercase leading-relaxed">
        Para facilitar sua experiência, siga o passo a passo abaixo para entender como funciona a lista de presentes.
      </p>
    </motion.div>
  );
}
