"use client";

import { useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next/client";
import { AnimatePresence } from "framer-motion";

import { FirstStep } from "./first-step";
import { SecondStep } from "./second-step";
import { ThirdStep } from "./third-step";
import { FourthStep } from "./fourth-step";
import { TutorialButtons } from "./tutorial-buttons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/tutorial-dialog";

export function GiftListTutorialModal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tutorialViewed = getCookie("tutorialViewed");

    console.log({ tutorialViewed });

    if (!tutorialViewed) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentStep]);

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle>Lista de Presentes - Tutorial</DialogTitle>
        </DialogHeader>

        <ScrollArea className="w-full  max-h-[400px] lg:max-h-[600px]">
          <div ref={boxRef} className="w-full flex flex-col justify-between gap-12">
            <AnimatePresence mode="wait" initial={false}>
              {currentStep === 0 && <FirstStep key="first-step" />}
              {currentStep === 1 && <SecondStep key="second-step" />}
              {currentStep === 2 && <ThirdStep key="third-step" />}
              {currentStep === 3 && <FourthStep key="fourth-step" />}
            </AnimatePresence>

            <TutorialButtons currentStep={currentStep} setCurrentStep={setCurrentStep} setIsOpen={setIsOpen} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
