"use client";
import { ResumeSVG } from "../../public/ResumeSVG";
import { useState, useRef } from "react";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { useReactToPrint } from "react-to-print";
import { ResumeData } from "@/components/ResumePreview";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Linkedin } from "lucide-react";
import { MessageCircle } from "lucide-react";

export default function CurriculoPage() {
  const [data, setData] = useState<ResumeData | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<"modelo1" | "modelo2">("modelo1");

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: data?.nome || "Curriculo",
    pageStyle: `
      @media print {
        body { -webkit-print-color-adjust: exact; }
        a { color: blue; text-decoration: underline; }
      }
    `,
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-indigo-700 text-white py-6 mb-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ResumeSVG />
          <h1 className="text-4xl font-bold mb-2">Crie Seu Currículo Online</h1>
          <p className="text-lg">
            Preencha os dados e visualize seu currículo em PDF
          </p>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="flex-1 max-w-4xl mx-auto px-4 grid md:grid-cols-1 gap-6">
        <ResumeForm
          template={template}
          setTemplate={setTemplate}
          onSubmit={(formData: ResumeData) => setData(formData)}
        />

        {data && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 w-full">Visualizar PDF</Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl w-full">
              <DialogHeader>
                <DialogTitle>Pré-visualização do Currículo</DialogTitle>
                <DialogClose className="absolute top-2 right-2" />
              </DialogHeader>

              <div className="overflow-auto max-h-[70vh] border p-4 bg-white rounded-md shadow-md">
                <ResumePreview
                  ref={componentRef}
                  data={data}
                  template={template}
                />
              </div>

              <Button className="mt-4 w-full" onClick={() => handlePrint?.()}>
                Exportar PDF
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-gray-200 py-4 mt-6">
        <div className="max-w-4xl mx-auto px-4 text-center space-x-4 flex justify-center">
          <a
            href="https://www.linkedin.com/in/santiago-ferreira-6964a9173/"
            target="_blank"
            className="underline text-indigo-400"
          >
            <Linkedin />
          </a>
          <a
            href="https://wa.me/5521965385878"
            target="_blank"
            className="underline text-green-400"
          >
            <MessageCircle />
          </a>
        </div>
        <div className="text-center mt-2">
          Desenvolvido por <strong>Santiago Ferreira</strong>
        </div>
      </footer>
    </div>
  );
}
