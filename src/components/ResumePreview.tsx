"use client";

import { forwardRef } from "react";
import Image from "next/image";

interface Experiencia {
  empresa: string;
  cargo: string;
  periodo: string;
  funcoes?: string;
}

export interface ResumeData {
  nome: string;
  email: string;
  telefone: string;
  linkedin?: string;
  github?: string;
  foto?: FileList;
  resumo: string;
  formacao: string;
  experiencias: Experiencia[];
  cursos?: string;
  skills: string;
}

interface ResumePreviewProps {
  data: ResumeData | null;
  template?: "modelo1" | "modelo2";
}

function renderParagraphs(text?: string) {
  if (!text) return null;
  return text.split("\n").map((line, i) => (
    <p key={i} className="ml-4">
      • {line}
    </p>
  ));
}

const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data, template = "modelo1" }, ref) => {
    if (!data)
      return (
        <p className="text-gray-500">
          Preencha o formulário para visualizar seu currículo...
        </p>
      );

    // Modelo 1 — Clássico
    if (template === "modelo1") {
      return (
        <div
          ref={ref}
          className="p-6  rounded-lg max-w-lg mx-auto bg-white  space-y-4 font-sans text-gray-800 w-full"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{data.nome}</h1>
            {data.foto?.[0] && (
              <Image
                src={URL.createObjectURL(data.foto[0])}
                alt="Foto"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>

          <p className="text-sm text-gray-600 space-x-2">
            {data.email} | {data.telefone}
            {data.linkedin && (
              <>
                {" "}
                | <a href={data.linkedin}>{data.linkedin}</a>
              </>
            )}
            {data.github && (
              <>
                {" "}
                | <a href={data.github}>{data.github}</a>
              </>
            )}
          </p>

          <div>
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">Resumo</h2>
            <p>{data.resumo}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">
              Formação
            </h2>
            <p>{data.formacao}</p>
          </div>

          {data.experiencias.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                Experiências
              </h2>
              {data.experiencias.map((exp, idx) => (
                <div key={idx} className="mb-3">
                  <p className="font-semibold">
                    {exp.cargo} – {exp.empresa}
                  </p>
                  <p className="text-sm text-gray-600">{exp.periodo}</p>
                  {renderParagraphs(exp.funcoes)}
                </div>
              ))}
            </div>
          )}

          {data.cursos && (
            <div>
              <h2 className="text-lg font-semibold border-b pb-1 mb-2">
                Cursos
              </h2>
              {renderParagraphs(data.cursos)}
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold border-b pb-1 mb-2">Skills</h2>
            <p>{data.skills}</p>
          </div>
        </div>
      );
    }

    // Modelo 2 — Moderno
    return (
      <div
        ref={ref}
        className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg space-y-6 font-sans"
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h1 className="text-3xl font-bold text-indigo-700">{data.nome}</h1>
            <p className="text-lg font-medium text-gray-700">
              {data.resumo.split("\n")[0]}
            </p>
          </div>
          {data.foto?.[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={URL.createObjectURL(data.foto[0])}
              alt="Foto"
              className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
            />
          )}
        </div>

        {/* Contatos */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>📧 {data.email}</span>
          <span>📞 {data.telefone}</span>
          {data.linkedin && (
            <span>
              🔗 <a href={data.linkedin}>{data.linkedin}</a>
            </span>
          )}
          {data.github && (
            <span>
              🐱 <a href={data.github}>{data.github}</a>
            </span>
          )}
        </div>

        {/* Formação */}
        <div className="border-l-4 border-indigo-500 pl-4 space-y-1">
          <h2 className="text-lg font-semibold text-indigo-700">Formação</h2>
          <p>{data.formacao}</p>
        </div>

        {/* Experiências */}
        {data.experiencias.length > 0 && (
          <div className="border-l-4 border-green-500 pl-4 space-y-2">
            <h2 className="text-lg font-semibold text-green-700">
              Experiências
            </h2>
            {data.experiencias.map((exp, idx) => (
              <div key={idx} className="space-y-1">
                <p className="font-semibold">
                  {exp.cargo} – {exp.empresa} ({exp.periodo})
                </p>
                {renderParagraphs(exp.funcoes)}
              </div>
            ))}
          </div>
        )}

        {/* Cursos */}
        {data.cursos && (
          <div className="border-l-4 border-purple-500 pl-4 space-y-1">
            <h2 className="text-lg font-semibold text-purple-700">Cursos</h2>
            {renderParagraphs(data.cursos)}
          </div>
        )}

        {/* Skills */}
        <div className="border-l-4 border-pink-500 pl-4 space-y-1">
          <h2 className="text-lg font-semibold text-pink-700">Skills</h2>
          <p>{data.skills}</p>
        </div>
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;
