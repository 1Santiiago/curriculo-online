// ResumePreview.tsx
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
    <p key={i} className="ml-4 text-justify">
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

    // ---------------- Modelo 1 (Clássico Profissional)
    if (template === "modelo1") {
      return (
        <div
          ref={ref}
          className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md font-serif text-gray-800 space-y-5"
        >
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h1 className="text-3xl font-bold">{data.nome}</h1>
            {data.foto?.[0] && (
              <Image
                src={URL.createObjectURL(data.foto[0])}
                alt="Foto"
                className="w-20 h-20 rounded-full object-cover border"
              />
            )}
          </div>

          {/* Contatos */}
          <p className="text-sm text-gray-600 border-b pb-2">
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

          {/* Resumo */}
          <section>
            <h2 className="text-xl font-semibold border-b mb-1">Resumo</h2>
            <p className="text-justify">{data.resumo}</p>
          </section>

          {/* Formação */}
          <section>
            <h2 className="text-xl font-semibold border-b mb-1">Formação</h2>
            <p>{data.formacao}</p>
          </section>

          {/* Experiências */}
          {data.experiencias.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b mb-1">
                Experiências
              </h2>
              {data.experiencias.map((exp, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-semibold">
                    {exp.cargo} – {exp.empresa}
                  </p>
                  <p className="text-sm text-gray-600">{exp.periodo}</p>
                  {renderParagraphs(exp.funcoes)}
                </div>
              ))}
            </section>
          )}

          {/* Cursos */}
          {data.cursos && (
            <section>
              <h2 className="text-xl font-semibold border-b mb-1">Cursos</h2>
              {renderParagraphs(data.cursos)}
            </section>
          )}

          {/* Skills */}
          <section>
            <h2 className="text-xl font-semibold border-b mb-1">Skills</h2>
            <p>{data.skills}</p>
          </section>
        </div>
      );
    }

    // ---------------- Modelo 2 (Moderno Criativo)
    return (
      <div
        ref={ref}
        className="grid grid-cols-3 max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Sidebar */}
        <aside className="col-span-1 bg-indigo-700 text-white p-6 space-y-4">
          {data.foto?.[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={URL.createObjectURL(data.foto[0])}
              alt="Foto"
              className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-white"
            />
          )}
          <h1 className="text-2xl font-bold text-center">{data.nome}</h1>
          <p className="text-sm text-center">{data.resumo.split("\n")[0]}</p>

          {/* Contatos */}
          <div className="mt-4 space-y-2 text-sm">
            <p>📧 {data.email}</p>
            <p>📞 {data.telefone}</p>
            {data.linkedin && <p>🔗 {data.linkedin}</p>}
            {data.github && <p>🐱 {data.github}</p>}
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold border-b border-white pb-1 mb-2">
              Skills
            </h2>
            <p>{data.skills}</p>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <main className="col-span-2 p-6 space-y-6">
          {/* Resumo */}
          <section>
            <h2 className="text-lg font-semibold text-indigo-700 border-b pb-1">
              Resumo
            </h2>
            <p className="text-gray-700 text-justify">{data.resumo}</p>
          </section>

          {/* Formação */}
          <section>
            <h2 className="text-lg font-semibold text-indigo-700 border-b pb-1">
              Formação
            </h2>
            <p>{data.formacao}</p>
          </section>

          {/* Experiências */}
          {data.experiencias.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-indigo-700 border-b pb-1">
                Experiências
              </h2>
              {data.experiencias.map((exp, idx) => (
                <div key={idx} className="mb-2">
                  <p className="font-semibold">
                    {exp.cargo} – {exp.empresa} ({exp.periodo})
                  </p>
                  {renderParagraphs(exp.funcoes)}
                </div>
              ))}
            </section>
          )}

          {/* Cursos */}
          {data.cursos && (
            <section>
              <h2 className="text-lg font-semibold text-indigo-700 border-b pb-1">
                Cursos
              </h2>
              {renderParagraphs(data.cursos)}
            </section>
          )}
        </main>
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;
