
# Pallaro Imóveis — MVP enxuto

Escopo mínimo: landing pública, listagem, detalhe, e formulário "Anunciar Imóvel". Tudo em PT-BR, responsivo, com dados estáticos. Sem auth, sem backend, sem mapas.

## Passos

### 1. Design system + dados de amostra
- Ajustar `src/styles.css` com paleta inspirada no site da Pallaro (azul institucional, branco, cinza neutro, acento dourado/laranja sutil) via tokens `oklch`.
- Criar `src/data/properties.ts` com ~6 imóveis de exemplo (id, título, tipo, finalidade venda/aluguel, cidade/bairro, preço, quartos, banheiros, vagas, área, descrição, array de imagens placeholder).
- Criar `src/types/property.ts` com a interface `Property` (também servirá de contrato para futura integração com banco).

### 2. Layout compartilhado (Header + Footer)
- `src/components/site/Header.tsx`: logo "Pallaro Seguros e Imóveis", nav (Início, Imóveis, Anunciar, Contato), responsivo com menu mobile (Sheet).
- `src/components/site/Footer.tsx`: contato, endereço fictício, redes.
- Aplicar no `__root.tsx` envolvendo o `<Outlet />`.

### 3. Landing page (`/`)
Substituir o placeholder em `src/routes/index.tsx` por:
- Hero com headline, busca rápida (tipo, finalidade, cidade) que leva para `/imoveis` com query params.
- Seção "Imóveis em destaque" (3–4 cards de `properties.ts`).
- Seção breve "Por que a Pallaro" (3 ícones/benefícios).
- CTA para "Anunciar Imóvel".

### 4. Listagem e detalhe
- `src/routes/imoveis.tsx`: grid responsivo de `PropertyCard`, filtros simples (finalidade, tipo, cidade, faixa de preço) com estado local lendo de `properties.ts`. Sem paginação.
- `src/routes/imoveis.$id.tsx`: galeria (carousel shadcn), preço, características (quartos/banheiros/vagas/área), descrição, botão "Tenho interesse" (abre `mailto:` ou WhatsApp link estático).
- `src/components/property/PropertyCard.tsx` reutilizável.

### 5. Formulário "Anunciar Imóvel" (`/anunciar`)
- `src/routes/anunciar.tsx` com `react-hook-form` + `zod`:
  - Dados do imóvel (tipo, finalidade, endereço, preço, quartos, banheiros, vagas, área, descrição).
  - Dados do proprietário (nome, email, telefone).
- Ao submeter: validar, salvar em `localStorage` (chave `pallaro:submissions`), exibir toast de sucesso, resetar form.
- `src/lib/submissions.ts` encapsula leitura/escrita — interface pronta para trocar por chamada a server function no futuro.

## Detalhes técnicos
- Stack já existente: TanStack Start + Tailwind v4 + shadcn/ui. Sem novas dependências (react-hook-form, zod, sonner já vêm no template).
- Cada rota define `head()` com `<title>` e `description` em PT-BR.
- Imagens: usar Unsplash via URL (ex: `https://images.unsplash.com/...`) — sem geração.
- Sem dependência de Lovable Cloud nesta fase; estrutura de dados pronta para migrar.

## Fora de escopo (confirmado)
Auth, admin, Supabase/Cloud, pagamentos, CRM, mapas, upload real de imagens, SSR de detalhes dinâmicos com fetch.
