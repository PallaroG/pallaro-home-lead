## Pallaro Imóveis — Fluxo profissional "Anunciar Imóvel" (frontend MVP)

Refatorar `/anunciar` em `/anunciar-imovel`: formulário multi-step de 6 etapas, somente venda, visual institucional (azul escuro, bege, dourado, sombras sutis). Sem backend, sem auth, sem assinatura real. Persistência apenas em `localStorage` com estrutura pronta para futura integração.

### Arquitetura de arquivos

```text
src/routes/
  anunciar-imovel.tsx          # rota nova, container do wizard
  anunciar.tsx                 # remover (ou redirect → /anunciar-imovel)

src/features/listing-form/
  types.ts                     # ListingDraft, Owner, Captador, Step enums
  schema.ts                    # zod schemas por step + schema completo
  constants.ts                 # categorias→subtipos, características agrupadas, corretores
  storage.ts                   # load/save/clear draft em localStorage (pallaro:listing-draft)
  context.tsx                  # ListingFormProvider (RHF + step state + persistência)
  StepIndicator.tsx            # progress bar com 6 etapas
  StepNav.tsx                  # botões Voltar / Próximo / Enviar
  steps/
    Step1MainData.tsx
    Step2Features.tsx
    Step3Details.tsx
    Step4OwnersKeys.tsx
    Step5Transaction.tsx
    Step6Review.tsx
  components/
    OwnerCard.tsx              # card de proprietário (add/remove)
    CaptadorCard.tsx
    FeatureGroup.tsx           # accordion por grupo com checkboxes
    FeatureSearch.tsx          # input de busca que filtra todos os grupos
    ContractPreview.tsx        # card de pré-visualização do contrato
    SignaturePad.tsx           # placeholder visual (nome + CPF + botão "Assinar")
    ImageUploadPlaceholder.tsx # dropzone visual sem upload real
    ReviewSection.tsx          # bloco título + chave/valor para a etapa 6
```

`src/lib/submissions.ts` continua, mas passa a aceitar o `ListingDraft` completo (somente `purpose: "venda"`). Tipo `Property` em `src/types/property.ts` é ajustado para remover `aluguel`.

### Stack & padrões

- `react-hook-form` + `@hookform/resolvers/zod` (já instalados). Um único `useForm` no provider, validação por step via `trigger(fieldsDoStep)` antes de avançar.
- Persistência: subscribe em `watch()` grava draft com debounce em `localStorage`; ao montar, hidrata `defaultValues`. Limpa após envio.
- shadcn já disponível: `Accordion`, `Checkbox`, `RadioGroup`, `Select`, `Input`, `Textarea`, `Card`, `Button`, `Separator`, `Badge`, `Progress`, `Form`, `Sonner`.
- Rota com `head()` PT-BR (title + description + og).
- Manter remoção total de "aluguel": tipo `PropertyPurpose = "venda"`, ajustar `properties.ts`, listagem e detalhe (esconder filtro de finalidade ou fixar em venda).

### Conteúdo das etapas (resumo)

1. **Dados principais** — categoria (Residencial / Comercial / Industrial / Rural / Internacional) → subtipo dependente; título, valor de venda, UF, cidade, bairro, endereço, número, complemento, área total, área construída, quartos, suítes, banheiros, vagas, descrição, upload placeholder.
2. **Características** — 5 grupos em `Accordion` (Bem-estar, Segurança, Lazer, Infraestrutura, Acabamento). Listas completas em `constants.ts`. `FeatureSearch` filtra opções em tempo real e auto-expande grupos com matches. Grid 2–3 colunas em desktop, 1 em mobile. Mostra contador de selecionados por grupo.
3. **Informações detalhadas** — condição, estágio reforma, estágio obra, ocupação, modo IPTU + valor, modo condomínio + valor (campo de valor condicional).
4. **Proprietários, chaves e negociação** — `useFieldArray` para owners (nome, CPF/CNPJ, telefone, email, % propriedade, obs); validação alerta se soma ≠ 100. Controle de chaves (disponível, local, info extra). `useFieldArray` para captadores. Corretor responsável (select com "Elio Pallaro" como default). Autorização (sim/não/análise) + início + duração (dias) → final calculado automaticamente.
5. **Transação e contrato** — transação fixa "Vender" (badge desabilitado). Valor anunciado, valor mínimo, comissão (%), obs, financiamento, permuta. Tipo de contrato (RadioGroup) com texto explicativo dinâmico. `ContractPreview` consome dados das etapas anteriores. 3 checkboxes obrigatórios. `SignaturePad` placeholder: ao clicar "Assinar autorização" valida nome+CPF preenchidos e marca estado `signed=true` (mostra badge ✓ verde com timestamp local).
6. **Revisão** — `ReviewSection`s agrupando dados; cada bloco com botão "Editar" que volta para o step correspondente. Status badge "Aguardando análise da Pallaro". Botão "Enviar imóvel para análise" → `saveSubmission(draft)`, limpa `localStorage`, navega para tela de sucesso (componente inline ou rota `/anunciar-imovel/sucesso`) com a mensagem solicitada e CTAs (Início / Ver imóveis).

### UX

- `StepIndicator` clicável apenas para steps já validados; mobile mostra "Etapa X de 6 — Título".
- Botões fixos no rodapé do card em mobile.
- Toasts (`sonner`) para erros de validação ao tentar avançar.
- Scroll para o topo do card ao trocar de etapa.
- Aria-labels e foco gerenciado para acessibilidade.

### Ajustes fora do wizard

- `Header` e `Footer`: trocar link "Anunciar" para `/anunciar-imovel`.
- Home (`/`) e listagem: remover qualquer menção a "aluguel" (filtro finalidade, copy, dados de amostra).
- Remover/redirect rota antiga `/anunciar`.

### Fora de escopo (confirmado)

Backend, Supabase, upload real de imagens, assinatura digital real, dashboard admin, pagamentos, CRM, integração com mapas, e-mail transacional. Toda a estrutura de dados (`ListingDraft`) já fica modelada para futura submissão a uma server function.
