import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell, Field, Submit } from "./AuthShell";
import { STORE_URL } from "@/lib/store";

export const metadata: Metadata = { title: "Iniciar sessão" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Iniciar sessão"
      image={{ src: "/img/banner-4.webp", alt: "Quatro pessoas com camisetas FeaT&Co" }}
      realUrl={`${STORE_URL}/account/login/`}
      footer={
        <p>
          Não possui uma conta ainda?{" "}
          <Link href="/conta/cadastro" className="font-medium underline underline-offset-4">
            Criar uma conta
          </Link>
        </p>
      }
    >
      <Field name="email" label="E-mail" type="email" placeholder="ex.: seuemail@email.com.br" autoComplete="email" />
      <Field name="senha" label="Senha" type="password" placeholder="ex.: suasenha" autoComplete="current-password" />
      <div className="flex justify-end">
        <a
          href={`${STORE_URL}/account/login/`}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] tracking-[0.15em] uppercase underline underline-offset-4"
        >
          Esqueceu a senha?
        </a>
      </div>
      <Submit>Iniciar sessão</Submit>
    </AuthShell>
  );
}
