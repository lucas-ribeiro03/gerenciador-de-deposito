# Point do Grell — Gerenciador de Depósito

Aplicação web full-stack para gerenciamento de produtos, categorias, pedidos e entregas de um depósito. O projeto simula uma operação completa: clientes consultam o catálogo, montam o carrinho e finalizam pedidos; administradores acompanham indicadores, organizam o catálogo e atualizam o status dos pedidos.

> Projeto desenvolvido para demonstrar conhecimentos em desenvolvimento web moderno, modelagem de dados, autenticação, regras de negócio e construção de interfaces responsivas.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=20232A)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

## Visão geral

O sistema foi pensado para atender dois tipos principais de uso. Na experiência pública, o cliente navega pelo catálogo, filtra produtos, adiciona itens ao carrinho, escolhe entre entrega e retirada, calcula a taxa de entrega, informa o endereço e acompanha seus pedidos. Na área administrativa, usuários autorizados gerenciam produtos e categorias, visualizam pedidos e acompanham métricas operacionais em um dashboard.

A aplicação também contempla autenticação por credenciais, controle de acesso por função, upload de imagens de produtos, persistência em PostgreSQL e validação de formulários no servidor e no cliente.

## Funcionalidades

### Área do cliente

- Cadastro e login com e-mail e senha.

- Catálogo público com busca, filtro por categoria e filtro de promoções.

- Exibição de preço promocional e disponibilidade dos produtos.

- Carrinho de compras persistido no estado da aplicação.

- Cadastro, seleção e exclusão de endereços.

- Escolha entre entrega e retirada no local.

- Cálculo de taxa de entrega com base no endereço informado.

- Finalização de pedidos com PIX, cartão de crédito, cartão de débito ou dinheiro.

- Consulta do histórico e do status dos próprios pedidos.

- Atualização de dados do perfil.

### Área administrativa

- Dashboard com resumo e evolução dos pedidos.

- Gráficos de acompanhamento por período.

- Cadastro, edição, exclusão e ativação ou desativação de produtos.

- Organização de produtos por categorias.

- Upload e remoção de imagens por meio do Cloudinary.

- Listagem e filtragem de pedidos.

- Atualização do status dos pedidos: pendente, confirmado, em rota de entrega, entregue ou cancelado.


## Tecnologias utilizadas

| Camada | Tecnologias |
| --- | --- |
| Interface e aplicação | Next.js 16, React 19, TypeScript |
| Estilos e componentes | Tailwind CSS 4, shadcn/ui, Base UI, Lucide React |
| Formulários e validação | React Hook Form, Zod e `@hookform/resolvers` |
| Estado e dados | TanStack React Query, Context API |
| Autenticação | NextAuth.js com credenciais e sessões JWT |
| Persistência | PostgreSQL, Prisma ORM |
| Imagens | Cloudinary e `next-cloudinary` |
| Geolocalização | Mapbox |
| Visualização de dados | Recharts |
| Infraestrutura local | Docker Compose |

## Arquitetura do projeto

O código está organizado por responsabilidade, separando interface, regras de negócio e acesso a dados. As Server Actions recebem as solicitações da interface, os services concentram operações de domínio e o Prisma realiza a comunicação com o PostgreSQL.

```
.
├── actions/       # Server Actions para autenticação e operações do sistema
├── app/           # Rotas, layouts e páginas do Next.js App Router
├── components/    # Componentes reutilizáveis e telas da aplicação
├── hooks/         # Hooks customizados
├── lib/           # Utilitários, autenticação, carrinho e cálculos
├── prisma/        # Schema, migrations e seed do banco de dados
├── providers/     # Contextos e providers globais
├── schemas/       # Schemas de validação
├── services/      # Regras de negócio e consultas persistentes
├── types/         # Tipos compartilhados e extensões de sessão
└── public/        # Arquivos estáticos e imagens públicas
```

### Principais entidades

O modelo de dados utiliza as entidades `User`, `Product`, `Category`, `Order`, `OrderItem`, `Address` e `Settings`. Os pedidos possuem tipo de entrega, forma de pagamento, valores subtotal, desconto, taxa de entrega e total, além de um status próprio para representar o fluxo operacional.

Os usuários podem exercer os papéis `ADMIN`, `EMPLOYEE` ou `CLIENT`. A autenticação é baseada em credenciais e a sessão utiliza JWT, permitindo que a aplicação identifique o usuário e seu papel nas áreas protegidas.

## Pré-requisitos

Antes de iniciar, instale os seguintes recursos:

- Node.js 20 ou superior.

- npm.

- Docker e Docker Compose, ou uma instância PostgreSQL acessível.

- Uma conta Cloudinary para upload de imagens.

- Um token do Mapbox para geocodificação e cálculo de entrega.

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/lucas-ribeiro03/gerenciador-de-deposito.git
cd gerenciador-de-deposito
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o PostgreSQL local

O projeto inclui um `docker-compose.yml` com PostgreSQL 15:

```bash
docker compose up -d
```

A configuração padrão do container utiliza:

| Campo | Valor |
| --- | --- |
| Usuário | `postgres` |
| Senha | `password` |
| Banco | `point_do_grell` |
| Porta | `5432` |

### 4. Configure as variáveis de ambiente

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

Preencha os valores necessários:

```
DATABASE_URL="postgresql://postgres:password@localhost:----/container-name"
NEXTAUTH_SECRET="uma-chave-secreta-forte"

ADMIN_NAME="Administrador"
ADMIN_EMAIL="admin@exemplo.com"
ADMIN_PHONE="11999999999"
ADMIN_PASSWORD="uma-senha-segura"

CLOUDINARY_CLOUD_NAME="seu-cloud-name"
CLOUDINARY_API_KEY="sua-api-key"
CLOUDINARY_API_SECRET="seu-api-secret"

MAPBOX_ACCESS_TOKEN="seu-token-mapbox"
DELIVERY_FEE_KEY="uma-chave-para-calculo-de-entrega"
```

Não versione o arquivo `.env`. O arquivo `.env.example` serve apenas como referência para a configuração local.

### 5. Aplique as migrations e crie o usuário administrador

```bash
npx prisma migrate dev
npx prisma db seed
```

O seed cria um usuário administrativo usando `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PHONE` e `ADMIN_PASSWORD`. Se o administrador já existir, o seed não o duplica.

### 6. Inicie a aplicação

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js. |
| `npm run build` | Gera o Prisma Client e cria o build de produção. |
| `npm run start` | Inicia a aplicação em modo de produção após o build. |
| `npm run lint` | Executa a verificação de lint com ESLint. |
| `npx prisma migrate dev` | Cria e aplica migrations no ambiente de desenvolvimento. |
| `npx prisma db seed` | Executa o seed de dados inicial. |
| `npx prisma studio` | Abre uma interface visual para consultar o banco. |

## Fluxo principal

```mermaid
flowchart LR
    A[Cliente acessa o catálogo] --> B[Filtra e escolhe produtos]
    B --> C[Adiciona itens ao carrinho]
    C --> D[Escolhe entrega ou retirada]
    D --> E[Calcula taxa e confirma endereço]
    E --> F[Seleciona forma de pagamento]
    F --> G[Cria o pedido]
    G --> H[Administrador atualiza o status]
    H --> I[Cliente acompanha o pedido]
```

## Decisões técnicas demonstradas

O projeto utiliza uma arquitetura em camadas para reduzir o acoplamento entre interface, regras de negócio e persistência. O Prisma schema explicita os relacionamentos e enumerações do domínio, enquanto as migrations registram a evolução do banco de dados.

A autenticação com NextAuth.js e sessões JWT permite proteger rotas e transportar informações de autorização, como o papel do usuário. Os formulários utilizam schemas de validação, reduzindo a possibilidade de dados inválidos chegarem às operações de negócio.

O checkout trata entrega e retirada como fluxos distintos. Quando a entrega é escolhida, o endereço é usado junto ao Mapbox para calcular a taxa correspondente. A operação de criação do pedido é executada com transação do Prisma, preservando a consistência entre pedido e itens.

## Possíveis evoluções

Como próximos passos, o projeto pode evoluir com testes automatizados para services e Server Actions, integração efetiva com um provedor de pagamento, controle de estoque com movimentações, notificações de mudança de status, observabilidade e pipeline de CI para lint, build e testes.

## Licença

Este projeto é disponibilizado exclusivamente para demonstração e avaliação. Conforme o arquivo [`LICENSE`](./LICENSE), todos os direitos são reservados ao autor. Não é permitida a cópia, modificação, distribuição ou reutilização do código sem autorização prévia e expressa.

## Autor

Desenvolvido por **Lucas Ribeiro**.

- GitHub: [@lucas-ribeiro03](https://github.com/lucas-ribeiro03)

- Repositório: [gerenciador-de-deposito](https://github.com/lucas-ribeiro03/gerenciador-de-deposito)

## Referências

[1]: https://nextjs.org/docs "Documentação do Next.js"

[2]: https://www.prisma.io/docs "Documentação do Prisma"

[3]: https://next-auth.js.org/ "Documentação do NextAuth.js"

[4]: https://docs.docker.com/compose/ "Documentação do Docker Compose"

[5]: https://docs.mapbox.com/ "Documentação do Mapbox"

[6]: https://cloudinary.com/documentation "Documentação do Cloudinary"

As tecnologias e ferramentas citadas nesta documentação podem ser consultadas nas referências oficiais [1] [2] [3] [4] [5] [6].
