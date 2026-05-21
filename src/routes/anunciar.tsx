import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/anunciar")({
  beforeLoad: () => {
    throw redirect({ to: "/anunciar-imovel" });
  },
});
