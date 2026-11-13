import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, Field, Submit } from "../AuthShell";
import { STORE_URL } from "@/lib/store";

export const metadata: Metadata = { title: "Criar uma conta" };

export default function CadastroPage() {
  return (
    <AuthShell
      title="Criar uma conta"
      intro="Compre mais rápido e acompanhe seus pedidos em um só lugar!"
      image={{ src: "/img/banner-3.webp", alt: "Detalhe do patch FT&Co bordado" }}
      realUrl={`${STORE_URL}/account/register/`}
      footer={
        <p>
          Já possui uma conta?{" "}
          <Link href="/conta" className="font-medium underline underline-offset-4">
            Faça login
          </Link>
        </p>
      }
    >
      <Field name="nome" label="Nome completo" placeholder="ex.: Maria Perez" autoComplete="name" />
      <Field name="email" label="E-mail" type="email" placeholder="ex.: seuemail@email.com.br" autoComplete="email" />
      <Field name="telefone" label="Telefone (opcional)" type="tel" placeholder="ex.: 11971923030" autoComplete="tel" />
      <Field name="senha" label="Senha" type="password" placeholder="ex.: suasenha" autoComplete="new-password" />
      <Field name="confirmar" label="Confirmar senha" type="password" placeholder="ex.: suasenha" autoComplete="new-password" />
      <Submit>Criar uma conta</Submit>
    </AuthShell>
  );
}
