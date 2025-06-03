# health Project

A brief description of the project.

## Como Executar Localmente

Para executar o projeto localmente, siga estes passos:

1.  Certifique-se de ter Node.js instalado. Recomenda-se usar a versão especificada em `.nvmrc` ou `package.json`.
2.  Instale as dependências do projeto:

    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente. Crie um arquivo `.env.local` na raiz do projeto e adicione as variáveis necessárias (consulte `.env.example` se disponível).

    ```bash
    cp .env.example .env.local
    # Edite .env.local com suas configurações
    ```

4.  Execute as migrações do banco de dados (se aplicável, para projetos com Prisma):

    ```bash
    npx prisma migrate dev --name initial_migration
    ```

5.  Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

O aplicativo estará disponível em `http://localhost:port` (a porta padrão geralmente é 3000 ou 5173, verifique a saída do comando `npm run dev`).

## Como Executar com Docker

Para executar o projeto usando Docker e Docker Compose, siga estes passos:

1.  Certifique-se de ter Docker e Docker Compose instalados.
2.  Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis necessárias (consulte `.env.example` se disponível). Este arquivo será usado pelo Docker Compose.

    ```bash
    cp .env.example .env
    # Edite .env com suas configurações
    ```

3.  Construa e inicie os contêineres usando Docker Compose:

    ```bash
    docker-compose up --build
    ```

Se você deseja executar os contêineres em segundo plano, use:

```bash
docker-compose up -d --build
```

O aplicativo estará acessível em `http://localhost:port` (verifique a porta mapeada no arquivo `docker-compose.yml`).

Para parar os contêineres, execute:

```bash
docker-compose down
``` 