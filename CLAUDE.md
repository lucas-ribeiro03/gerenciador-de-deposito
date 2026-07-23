@AGENTS.md

# Roadmap de Desenvolvimento --- Point do Grell

## Etapa 1 --- Estrutura do Projeto

Objetivo: preparar toda a infraestrutura da aplicação.

- Criar projeto Next.js
- Configurar TypeScript
- Configurar Tailwind CSS
- Configurar Shadcn UI
- Configurar ESLint e Prettier
- Configurar Prisma ORM
- Configurar PostgreSQL
- Configurar variáveis de ambiente
- Definir estrutura de pastas
- Configurar React Hot Toast
- Configurar TanStack Query

---

## Etapa 2 --- Banco de Dados

Objetivo: criar toda a estrutura persistente da aplicação.

- Modelar as entidades no Prisma
- Criar relacionamentos
- Criar enums
- Executar migrations
- Criar seed inicial
  - Usuário administrador
  - Categorias
  - Configurações padrão

---

## Etapa 3 --- Autenticação

Objetivo: controlar acesso ao sistema.

- Login
- Cadastro
- Logout
- Sessão
- Proteção de rotas
- Implementação das roles:
  - ADMIN
  - EMPLOYEE
  - DELIVERY
  - CLIENT

---

## Etapa 4 --- Layout Base

Objetivo: criar a identidade visual da aplicação.

### Área pública

- Navbar
- Footer
- Layout principal
- Responsividade

### Painel administrativo

- Sidebar
- Header
- Breadcrumb
- Layout do painel

---

## Etapa 5 --- Catálogo de Produtos

Objetivo: disponibilizar os produtos para navegação.

### Cliente

- Home
- Listagem de produtos
- Categorias
- Pesquisa
- Página de detalhes do produto

### Admin

- CRUD de produtos
- CRUD de categorias
- Controle de disponibilidade

---

## Etapa 6 --- Carrinho

- Adicionar produtos
- Remover produtos
- Alterar quantidades
- Calcular subtotal
- Persistir carrinho

---

## Etapa 7 --- Endereços

- Cadastro de endereço
- Integração com ViaCEP
- Geocodificação
- Salvar latitude e longitude
- Listagem de endereços
- Seleção de endereço

---

## Etapa 8 --- Frete

- Calcular distância
- Calcular frete
- Validar área de entrega
- Exibir distância e valor do frete

---

## Etapa 9 --- Checkout

Fluxo:

Carrinho → Endereço → Entrega ou Retirada → Pagamento → Resumo → Pedido

Implementar:

- Criação do pedido
- Criação dos itens do pedido
- Cálculo do total

---

## Etapa 10 --- Área do Cliente

- Meus pedidos
- Detalhes do pedido
- Perfil
- Endereços

---

## Etapa 11 --- Gerenciamento de Pedidos

Painel administrativo:

- Listagem
- Pesquisa
- Filtros
- Detalhes
- Alteração de status

---

## Etapa 12 --- Dashboard

- Pedidos hoje
- Pedidos da semana
- Pedidos do mês
- Faturamento
- Ticket médio
- Produtos vendidos
- Gráficos

---

## Etapa 13 --- Configurações

- Gerenciar Settings
- Horário de funcionamento
- Controle de estabelecimento aberto/fechado
- Bloqueio de pedidos fora do horário

---

## Etapa 14 --- Funcionários

- CRUD de funcionários
- Controle de permissões
- Gerenciamento de roles

---

## Etapa 15 --- Upload de Imagens

- Upload
- Atualização
- Remoção
- Otimização das imagens

---

## Etapa 16 --- Refinamentos

- Refatorações
- Loading states
- Error states
- Skeletons
- Validações
- SEO
- Performance
- Responsividade
- Acessibilidade

---

# Ordem de Desenvolvimento

1.  Estrutura do projeto
2.  Banco de dados
3.  Autenticação
4.  Layout base
5.  Catálogo de produtos
6.  Carrinho
7.  Endereços
8.  Frete
9.  Checkout
10. Área do cliente
11. Gerenciamento de pedidos
12. Dashboard
13. Configurações
14. Funcionários
15. Upload de imagens
16. Refinamentos

# Arquitetura da Aplicação

A aplicação seguirá uma arquitetura baseada em **Server Actions** e **Services**, com o objetivo de manter uma clara separação de responsabilidades, facilitar a manutenção do código e permitir a reutilização da lógica de negócio.

---

# Fluxo da Aplicação

Todo formulário seguirá o fluxo abaixo:

```text
Formulário

↓

FormData

↓

Server Action

↓

Validação (Zod)

↓

Service

↓

Prisma

↓

Banco de Dados

↓

Retorno para a Action

↓

Resposta para o Cliente
```

---

# Responsabilidade de cada camada

## Componentes

Os componentes serão responsáveis apenas pela interface da aplicação.

Responsabilidades:

- Renderizar a interface.
- Coletar os dados do usuário.
- Enviar os dados através de um `FormData`.
- Exibir feedbacks (Toast, Loading, Erros, etc.).

Os componentes **não devem**:

- Acessar o Prisma.
- Possuir regras de negócio.
- Executar queries.

---

## Server Actions

As Server Actions serão responsáveis por controlar todo o fluxo da requisição.

Responsabilidades:

- Receber um `FormData`.
- Converter os dados necessários.
- Validar utilizando Zod.
- Executar validações simples.
- Chamar o Service responsável.
- Retornar um objeto padronizado para o frontend.

As Actions **não devem realizar queries diretamente utilizando Prisma**.

### Exemplo de retorno

Sucesso:

```ts
{
    success: true,
    message: "Produto cadastrado com sucesso."
}
```

Erro:

```ts
{
    success: false,
    message: "Dados inválidos."
}
```

---

## Services

Os Services serão responsáveis por toda a regra de negócio da aplicação.

Responsabilidades:

- Executar queries.
- Utilizar Prisma.
- Centralizar regras de negócio.
- Reutilizar código entre diferentes Actions.

Exemplos:

```text
createProductService()

updateProductService()

deleteProductService()

createOrderService()

calculateDeliveryFeeService()

getDashboardDataService()
```

Toda comunicação com o banco deverá passar por um Service.

---

## Prisma

O Prisma será utilizado exclusivamente para comunicação com o banco de dados.

Responsabilidades:

- Buscar registros.
- Criar registros.
- Atualizar registros.
- Remover registros.

Não deverá conter regras de negócio.

---

# Estrutura de Pastas

```text
actions/
   ├── auth/
   ├── products/
   ├── orders/
   ├── categories/
   └── settings/
services/
   ├── auth/
   ├── products/
   ├── orders/
   ├── categories/
   └── settings/

schemas/

lib/
prisma/
app/
components/
hooks/
types/
```

---

# Padrão das Server Actions

Todas as Server Actions deverão seguir o mesmo fluxo.

```text
Recebe FormData

↓

Valida utilizando Zod

↓

Executa validações adicionais

↓

Chama um Service

↓

Retorna resposta para o frontend
```

---

# Padrão de Retorno

Sempre que possível, as Actions deverão retornar um objeto padronizado.

Resposta simples:

```ts
{
  success: boolean;
  message: string;
}
```

Quando houver necessidade de retornar dados:

```ts
{
    success: boolean;
    message: string;
    data?: T;
}
```

Esse padrão facilita o tratamento das respostas no frontend.

---

# Exemplo de Fluxo

```text
CreateProductForm

↓

createProductAction(formData)

↓

createProductSchema

↓

createProductService()

↓

prisma.product.create()

↓

return

{
    success: true,
    message: "Produto criado com sucesso."
}
```

---

# Convenções do Projeto

Durante todo o desenvolvimento do **Point do Grell**, serão seguidas as seguintes convenções:

- Todos os formulários enviarão os dados utilizando `FormData`.
- Todas as validações de entrada serão realizadas utilizando **Zod** dentro das **Server Actions**.
- Nenhuma Server Action realizará acesso direto ao Prisma.
- Toda comunicação com o banco de dados deverá passar obrigatoriamente pela camada de **Services**.
- Os componentes serão responsáveis apenas pela interface e interação com o usuário.
- Toda regra de negócio deverá permanecer centralizada nos Services.
- As respostas das Server Actions deverão seguir um padrão consistente para facilitar o consumo pelo frontend.

Essa arquitetura será adotada em toda a aplicação para garantir organização, reutilização de código, facilidade de manutenção e escalabilidade do projeto.

# Mobile First

A aplicação será desenvolvida seguindo a abordagem **Mobile First**, ou seja, toda a interface será projetada inicialmente para dispositivos móveis e, posteriormente, adaptada para tablets e desktops.

Essa decisão foi tomada porque a maioria dos usuários de um depósito de bebidas tende a realizar pedidos pelo celular. Portanto, a experiência mobile será sempre priorizada durante o desenvolvimento.

---

# Diretrizes

Durante o desenvolvimento, deverão ser seguidas as seguintes diretrizes:

- Toda tela deverá ser projetada primeiro para dispositivos móveis.
- A versão desktop será construída apenas após a versão mobile estar finalizada.
- Todos os componentes deverão ser responsivos.
- Evitar rolagem horizontal.
- Priorizar áreas de toque confortáveis para botões e ações.
- Utilizar espaçamentos consistentes para facilitar a navegação em telas menores.
- Garantir boa legibilidade utilizando tamanhos de fonte adequados.
- Sempre considerar acessibilidade e usabilidade em dispositivos móveis.

---

# Responsividade

Após a conclusão da versão mobile, a interface será adaptada para resoluções maiores utilizando os breakpoints do Tailwind CSS.

A evolução da interface seguirá a seguinte ordem:

```text
Mobile
    ↓
Tablet
    ↓
Desktop
```

Nenhuma tela deverá ser desenvolvida inicialmente pensando apenas em desktop.

---

# Componentes

Todos os componentes deverão ser construídos considerando primeiramente o uso em dispositivos móveis.

Sempre que possível:

- Utilizar componentes do Shadcn UI.
- Priorizar layouts verticais em telas pequenas.
- Evitar tabelas extensas no mobile, utilizando cards ou listas quando necessário.
- Utilizar modais e drawers quando proporcionarem uma melhor experiência em telas menores.

---

# Painel Administrativo

Embora o painel administrativo seja utilizado majoritariamente em desktops, ele também deverá ser responsivo.

No mobile:

- Sidebar recolhível.
- Navegação simplificada.
- Cards responsivos.
- Tabelas adaptadas para listas ou com rolagem horizontal apenas quando estritamente necessário.

---

# Convenção do Projeto

Durante todo o desenvolvimento do **Point do Grell**, todas as implementações de interface deverão seguir a filosofia **Mobile First**.

Ao desenvolver qualquer tela ou componente, a prioridade será:

1. Mobile
2. Tablet
3. Desktop

Essa convenção garante uma melhor experiência para o público-alvo da aplicação e reduz retrabalho durante a evolução da interface.

# Configuração do Prisma

O projeto utilizará o **Prisma ORM** como camada de acesso ao banco de dados, utilizando o **PrismaPg Adapter** para conexão com o PostgreSQL.

Toda a estrutura relacionada ao Prisma ficará organizada em uma pasta dedicada, mantendo todos os arquivos relacionados ao banco de dados centralizados.

A versão do Prisma e de todos os plugins relacionados será a 7.8.0 ou se não estiver chego nessa ainda, a mais recente compatível.

---

# Data Source

O datasource utilizará a variável de ambiente:

```env
DATABASE_URL=
```

Essa variável será utilizada para todas as operações do Prisma, incluindo geração do client, migrations e execução das seeds.

---

# Estrutura

A organização dos arquivos será a seguinte:

```text
.
├── prisma.config.ts
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   ├── prisma.ts
│   └── seeds/
```

Cada item terá sua responsabilidade:

- **prisma.config.ts** → Arquivo de configuração do Prisma.
- **prisma/migrations/** → Histórico de migrations do banco de dados.
- **prisma/schema.prisma** → Modelagem das entidades e configurações do Prisma.
- **prisma/prisma.ts** → Instância única do Prisma Client utilizando o PrismaPg Adapter.
- **prisma/seeds/** → Arquivos responsáveis pela população inicial do banco.

---

# prisma.config.ts

O arquivo `prisma.config.ts` ficará na **raiz do projeto**.

Ele será responsável por configurar o Prisma e informar os caminhos utilizados pela aplicação.

Serão configurados os caminhos para:

- Schema (`./prisma/schema.prisma`)
- Migrations (`./prisma/migrations`)
- Seeds (`./prisma/seeds`)

O datasource utilizará a variável de ambiente:

```env
DATABASE_URL
```

---

# prisma.ts

O arquivo `prisma/prisma.ts` será responsável por:

- Criar a instância do Prisma Client.
- Configurar o PrismaPg Adapter.
- Utilizar a `DATABASE_URL` como conexão com o banco.
- Exportar uma única instância do Prisma para toda a aplicação.

Todos os Services deverão importar essa instância para acessar o banco de dados.

---

# Convenções

Durante todo o desenvolvimento do **Point do Grell**, serão seguidas as seguintes convenções:

- O arquivo `prisma.config.ts` permanecerá na raiz do projeto.
- Toda a estrutura do Prisma ficará centralizada na pasta `prisma`.
- O schema ficará em `prisma/schema.prisma`.
- As migrations ficarão em `prisma/migrations`.
- As seeds ficarão em `prisma/seeds`.
- A instância do Prisma Client ficará em `prisma/prisma.ts`.
- O datasource utilizará exclusivamente a variável de ambiente `DATABASE_URL`.
- Apenas uma única instância do Prisma Client deverá existir em toda a aplicação.
- Todo acesso ao banco de dados deverá ocorrer exclusivamente através da camada de **Services**.

# Docker

O projeto utilizará **Docker** para disponibilizar um ambiente de desenvolvimento consistente, executando o banco de dados PostgreSQL em um container.

---

# Docker Compose

Será utilizado um arquivo `docker-compose.yml` localizado na raiz do projeto.

Estrutura:

```text
.
├── docker-compose.yml
├── prisma.config.ts
├── prisma/
├── src/
└── ...
```

---

# Banco de Dados

O banco de dados será executado utilizando a imagem oficial:

```text
postgres:15
```

Configuração do container:

| Propriedade           | Valor               |
| --------------------- | ------------------- |
| **image**             | `postgres:15`       |
| **container_name**    | `point-do-grell-db` |
| **POSTGRES_USER**     | `postgres`          |
| **POSTGRES_PASSWORD** | `password`          |
| **POSTGRES_DB**       | `point_do_grell`    |
| **ports**             | `5432:5432`         |

---

# docker-compose.yml

A configuração seguirá o padrão abaixo:

```yaml
services:
  postgres:
    image: postgres:15
    container_name: point-do-grell-db

    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: point_do_grell

    ports:
      - "5432:5432"
```

---

# Variável de Ambiente

A aplicação utilizará a seguinte conexão com o banco:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/point_do_grell"
```

---

# Convenções

Durante todo o desenvolvimento do **Point do Grell**, serão seguidas as seguintes convenções:

- O banco de dados será executado via Docker.
- Será utilizada a imagem oficial `postgres:15`.
- O container terá o nome `point-do-grell-db`.
- O usuário padrão será `postgres`.
- A senha padrão será `password`.
- O banco de dados será `point_do_grell`.
- A porta `5432` do container será exposta na porta `5432` da máquina local.
- A aplicação utilizará a variável de ambiente `DATABASE_URL` para conexão com o banco de dados.

# Tailwind CSS e Shadcn UI

A interface da aplicação será desenvolvida utilizando **Tailwind CSS** e a **versão mais recente do Shadcn UI**.

O **Shadcn UI** será a biblioteca oficial de componentes do projeto e deverá ser a primeira opção para construção de qualquer interface.

---

# Tailwind CSS

O Tailwind CSS será responsável por toda a estilização da aplicação.

Diretrizes:

- Utilizar a versão mais recente do Tailwind CSS.
- Seguir as recomendações oficiais da documentação.
- Utilizar classes utilitárias para estilização.
- Desenvolver todas as telas seguindo a abordagem **Mobile First**.
- Utilizar os breakpoints padrão do Tailwind para responsividade.

---

# Shadcn UI

O projeto utilizará sempre a **versão mais recente do Shadcn UI**.

Como a biblioteca está em constante evolução, a disponibilidade de componentes pode variar entre versões. Portanto, o projeto deverá utilizar **todos os componentes disponíveis na versão adotada**.

---

# Convenção Obrigatória

Durante todo o desenvolvimento do **Point do Grell**, deverá ser seguida a seguinte regra:

> **Sempre verificar primeiro se o componente existe no Shadcn UI.**

Se existir, **ele deverá obrigatoriamente ser utilizado**.

Não deverão ser criados componentes do zero quando houver um componente equivalente disponível na biblioteca.

Exemplos:

❌ Evitar:

```tsx
<button>Salvar</button>

<input />

<select />
```

✅ Utilizar:

```tsx
<Button />

<Input />

<Select />
```

---

# Quando criar componentes personalizados?

A criação de componentes próprios será permitida apenas quando:

- O componente **não existir** na versão atual do Shadcn UI.
- Houver necessidade de criar uma composição de componentes para atender uma regra de negócio.
- A funcionalidade desejada não puder ser alcançada através da customização dos componentes existentes.

---

# Ordem de Prioridade

Ao desenvolver qualquer interface, a seguinte ordem deverá ser respeitada:

1. Utilizar um componente existente do Shadcn UI.
2. Customizar o componente utilizando Tailwind CSS.
3. Compor múltiplos componentes do Shadcn UI.
4. Criar um componente personalizado apenas quando não existir alternativa na biblioteca.

---

# Objetivo

Seguir essa convenção garante:

- Consistência visual em toda a aplicação.
- Melhor integração com o Tailwind CSS.
- Redução de código duplicado.
- Facilidade de manutenção.
- Evolução mais simples conforme novas versões do Shadcn UI forem disponibilizadas.
- Aproveitamento máximo dos componentes oficiais da biblioteca.

# Proteção de Rotas

A aplicação utilizará o arquivo **`proxy.ts`** para realizar a proteção e validação das rotas.

Toda regra de autenticação e autorização será centralizada nesse arquivo, garantindo que apenas usuários autorizados possam acessar determinadas áreas da aplicação.

---

# Objetivo

O `proxy.ts` será responsável por interceptar as requisições antes que elas cheguem às páginas da aplicação, verificando:

- Se o usuário está autenticado.
- Se o usuário possui permissão para acessar a rota.
- Se a rota é pública ou protegida.
- Para onde o usuário deverá ser redirecionado quando necessário.

---

# Rotas Públicas

As rotas públicas poderão ser acessadas sem autenticação.

Exemplos:

- Home
- Catálogo de produtos
- Página de produto
- Login
- Cadastro

---

# Rotas Protegidas

As rotas protegidas exigirão autenticação.

Exemplos:

- Perfil
- Meus pedidos
- Endereços
- Checkout

Caso o usuário não esteja autenticado, ele será redirecionado para a página de login.

---

# Rotas Administrativas

As rotas do painel administrativo exigirão:

- Usuário autenticado.
- Permissão compatível com a rota acessada.

Exemplos:

- `/admin`
- `/admin/products`
- `/admin/orders`
- `/admin/categories`
- `/admin/settings`
- `/admin/dashboard`

Caso o usuário não possua permissão, o acesso deverá ser negado.

---

# Controle de Permissões

O controle de acesso será realizado utilizando o campo `role` do usuário.

Exemplo de papéis:

- `ADMIN`
- `CLIENT`

Cada papel terá acesso apenas às funcionalidades permitidas.

---

# Convenções

Durante todo o desenvolvimento do **Point do Grell**, serão seguidas as seguintes convenções:

- Toda validação de rotas será realizada através do arquivo `proxy.ts`.
- O `proxy.ts` será o ponto central de autenticação e autorização da aplicação.
- Rotas públicas permanecerão acessíveis sem autenticação.
- Rotas protegidas exigirão usuário autenticado.
- Rotas administrativas exigirão autenticação e verificação de permissões.
- As permissões serão definidas de acordo com o `role` do usuário.
- Sempre que possível, a lógica de proteção de rotas deverá permanecer centralizada no `proxy.ts`, evitando duplicação de validações ao longo da aplicação.

# Regras de Negócio e Arquitetura

Além das convenções já definidas para o projeto, deverão ser seguidas as regras abaixo durante todo o desenvolvimento do **Point do Grell**.

---

# 1. Client Components

Os **Client Components** deverão ser utilizados **exclusivamente para interação com o usuário**.

Exemplos:

- Controle de estado da interface.
- Abertura e fechamento de modais.
- Drawers.
- Dropdowns.
- Formulários.
- Hooks do React.
- Eventos de clique.
- Animações.

Os Client Components **não deverão conter**:

- Regras de negócio.
- Queries ao banco de dados.
- Validações de negócio.
- Processamento de dados.
- Cálculos que pertençam à regra de negócio da aplicação.

Toda regra de negócio deverá permanecer na camada de **Services**.

---

# 2. Page.tsx

Os arquivos `page.tsx` deverão permanecer o mais enxutos possível.

Sua responsabilidade será apenas:

- Buscar os dados necessários (quando aplicável).
- Renderizar os componentes da página.
- Definir o layout da página.

Os arquivos `page.tsx` **não deverão conter**:

- Componentes grandes.
- Componentes internos.
- Lógica de interface complexa.
- Regras de negócio.

---

# 3. Componentização

Nenhuma tela deverá ser construída inteiramente dentro de um `page.tsx`.

A interface deverá ser dividida em pequenos componentes reutilizáveis.

Exemplo:

```text
page.tsx

├── Header
├── Filters
├── ProductsGrid
│   ├── ProductCard
│   ├── ProductCard
│   └── ProductCard
├── Pagination
└── EmptyState
```

Outro exemplo para uma página administrativa:

```text
page.tsx

├── DashboardHeader
├── MetricsCards
├── RevenueChart
├── OrdersTable
└── RecentOrders
```

---

# 4. Responsabilidade do page.tsx

O `page.tsx` deverá atuar como um orquestrador da página.

Fluxo esperado:

```text
Buscar dados

↓

Renderizar componentes

↓

Fim
```

Evitar qualquer outra responsabilidade além dessas.

---

# 5. Componentes

Os componentes deverão possuir responsabilidade única.

Cada componente deverá fazer apenas uma tarefa.

Exemplos:

- ProductCard
- ProductPrice
- ProductImage
- ProductActions

Ao invés de um único componente contendo centenas de linhas.

---

# 6. Reutilização

Sempre que um componente puder ser reutilizado em outra tela, ele deverá ser extraído.

Evitar duplicação de código.

---

# Convenções Obrigatórias

Durante todo o desenvolvimento do **Point do Grell**, deverão ser seguidas obrigatoriamente as seguintes regras:

- Nunca implementar regras de negócio em Client Components.
- Nunca acessar diretamente o banco de dados em Client Components.
- Nunca escrever uma página inteira dentro de um `page.tsx`.
- O `page.tsx` deverá apenas buscar dados (quando necessário) e renderizar componentes.
- Componentes grandes deverão ser divididos em componentes menores.
- Sempre priorizar componentes reutilizáveis.
- Toda regra de negócio deverá permanecer centralizada na camada de **Services**.
- Toda validação de entrada deverá permanecer nas **Server Actions**.
