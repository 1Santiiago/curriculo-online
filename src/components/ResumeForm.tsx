"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";

const formSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  telefone: z.string(),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  foto: z.any().optional(),
  resumo: z.string(),
  formacao: z.string(),
  experiencias: z.array(
    z.object({
      empresa: z.string(),
      cargo: z.string(),
      periodo: z.string(),
      funcoes: z.string().optional(),
    })
  ),
  cursos: z.string().optional(),
  skills: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function ResumeForm({
  onSubmit,
  template,
  setTemplate,
}: {
  onSubmit: (data: FormData) => void;
  template: "modelo1" | "modelo2";
  setTemplate: (t: "modelo1" | "modelo2") => void;
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      experiencias: [{ empresa: "", cargo: "", periodo: "", funcoes: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiencias",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 px-2 sm:px-4 md:px-6 lg:px-8"
    >
      <div className="mb-4">
        <label className="block font-medium mb-1">Escolha um modelo:</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value as "modelo1" | "modelo2")}
          className="border p-2 sm:p-3 md:p-4 rounded-md w-full md:w-auto text-sm sm:text-base md:text-lg"
        >
          <option value="modelo1">Modelo 1 - Clássico</option>
          <option value="modelo2">Modelo 2 - Moderno</option>
        </select>
      </div>

      {/* Dados Pessoais */}
      <div className="p-4 sm:p-6 md:p-8 rounded-lg shadow-sm space-y-4 bg-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Dados Pessoais
        </h2>
        <div className="space-y-2 flex flex-col">
          <label className="block font-medium">Nome</label>
          <Input
            placeholder="Nome"
            {...register("nome")}
            className="w-full text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
          />
          {errors.nome && (
            <p className="text-red-500 text-sm sm:text-base">
              Campo obrigatório
            </p>
          )}
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="block font-medium">Foto (opcional)</label>
          <Input type="file" {...register("foto")} accept="image/*" />
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="block font-medium">E-mail</label>
          <Input
            placeholder="E-mail"
            {...register("email")}
            className="w-full text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="block font-medium">Telefone</label>
          <Input
            placeholder="Telefone"
            {...register("telefone")}
            className="w-full text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="block font-medium">LinkedIn</label>
          <Input
            placeholder="linkedin"
            {...register("linkedin")}
            className="w-full text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="block font-medium">GitHub</label>
          <Input
            placeholder="github"
            {...register("github")}
            className="w-full text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
          />
        </div>
      </div>

      {/* Experiências */}
      <div className="p-4 sm:p-6 md:p-8 rounded-lg shadow-sm space-y-4 bg-white overflow-x-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Experiências
        </h2>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border p-3 sm:p-4 md:p-5 rounded-md space-y-2 bg-gray-50 shadow-sm min-w-[300px]"
          >
            <div className="space-y-2 flex flex-col">
              <label className="block font-medium">Empresa</label>
              <Input
                {...register(`experiencias.${index}.empresa`)}
                className="w-full text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="block font-medium">Cargo</label>
              <Input
                {...register(`experiencias.${index}.cargo`)}
                className="w-full text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="block font-medium">Período</label>
              <Input
                placeholder="Ex: Jan/2020 - Dez/2022"
                {...register(`experiencias.${index}.periodo`)}
                className="w-full text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label className="block font-medium">Funções</label>
              <textarea
                {...register(`experiencias.${index}.funcoes`)}
                className="w-full border p-2 sm:p-3 md:p-4 rounded-md h-20 sm:h-24 md:h-28 resize-none text-sm sm:text-base md:text-lg"
                placeholder="Cada linha será uma responsabilidade"
              />
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={() => remove(index)}
              className="w-full"
            >
              Remover
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            append({ empresa: "", cargo: "", periodo: "", funcoes: "" })
          }
          className="w-full"
        >
          + Adicionar Experiência
        </Button>
      </div>

      {/* Cursos e Skills */}
      <div className="p-4 sm:p-6 md:p-8 rounded-lg shadow-sm space-y-4 bg-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Cursos e Skills
        </h2>
        <div className="space-y-2 flex flex-col">
          <label className="block font-medium">Cursos</label>
          <textarea
            {...register("cursos")}
            className="w-full border p-2 sm:p-3 md:p-4 rounded-md h-20 sm:h-24 md:h-28 resize-none text-sm sm:text-base md:text-lg"
            placeholder="Cada curso em uma linha"
          />
        </div>

        <div className="space-y-2 flex flex-col">
          <label className="block font-medium">Skills</label>
          <Input
            placeholder="Ex: React, Next.js, SQL"
            {...register("skills")}
            className="w-full text-sm sm:text-base md:text-lg p-2 sm:p-3 md:p-4"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg"
      >
        Gerar Currículo
      </Button>
    </form>
  );
}
