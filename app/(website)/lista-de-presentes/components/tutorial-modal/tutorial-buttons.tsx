import { Button } from "@/components/ui/button";
import { setCookie } from "cookies-next/client";
import { AnimatePresence, motion } from "motion/react";

interface TutorialButtonsProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export function TutorialButtons({ currentStep, setCurrentStep, setIsOpen }: TutorialButtonsProps) {
  const handleNextStep = () => {
    if (currentStep === 3) {
      setIsOpen(false);
      setCookie("tutorialViewed", "true");
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-5 pb-9 px-6">
      <div className="w-full flex items-center justify-center gap-3">
        <AnimatePresence mode="wait" initial={false}>
          <div
            key="current-step-0"
            className="size-4 p-[2px] rounded-full border border-primary flex items-center justify-center"
          >
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="size-full bg-secondary rounded-full"
              />
            )}
          </div>

          <div
            key="current-step-1"
            className="size-4 p-[2px] rounded-full border border-primary flex items-center justify-center"
          >
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="size-full bg-secondary rounded-full"
              />
            )}
          </div>

          <div
            key="current-step-2"
            className="size-4 p-[2px] rounded-full border border-primary flex items-center justify-center"
          >
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="size-full bg-secondary rounded-full"
              />
            )}
          </div>

          <div
            key="current-step-3"
            className="size-4 p-[2px] rounded-full border border-primary flex items-center justify-center"
          >
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="size-full bg-secondary rounded-full"
              />
            )}
          </div>
        </AnimatePresence>
      </div>

      <div className="w-full flex flex-col-reverse gap-3 sm:flex-row">
        {currentStep > 0 && (
          <Button variant="outline" size="lg" className="w-full" onClick={() => setCurrentStep(currentStep - 1)}>
            Voltar
          </Button>
        )}

        <Button size="lg" className="w-full" onClick={handleNextStep}>
          {currentStep === 3 ? "Entendi" : "Continuar"}
        </Button>
      </div>
    </div>
  );
}
