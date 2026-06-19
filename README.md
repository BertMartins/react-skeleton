# React + .NET 8 + Entity Framework + PostgreSQL — Skeleton

Projeto esqueleto pronto para uso. Contém autenticação completa (login/registro/JWT), rota protegida e integração full-stack.

---

## Estrutura

```
react-ef-skeleton/
├── backend/          # .NET 8 Web API + Entity Framework + JWT
├── frontend/         # React 18 + TypeScript + Vite
├── docker-compose.yml
└── README.md
```

---

## Pré-requisitos

| Ferramenta | Versão mínima | Download |
|---|---|---|
| .NET SDK | 8.0 | https://dotnet.microsoft.com/download |
| Node.js | 18 LTS | https://nodejs.org |
| Docker Desktop | qualquer | https://www.docker.com/products/docker-desktop |

---

## 1 — Subir o banco PostgreSQL

```bash
# Na raiz do projeto
docker-compose up -d
```

Isso sobe um container PostgreSQL na porta **5432** com:
- **Banco:** `skeleton_db`
- **Usuário:** `postgres`
- **Senha:** `postgres`

Para parar: `docker-compose down`
Para parar e apagar os dados: `docker-compose down -v`

---

## 2 — Configurar o Backend

### 2.1 Instalar o Entity Framework CLI (uma vez só)

```bash
dotnet tool install --global dotnet-ef
```

### 2.2 Entrar na pasta e restaurar pacotes

```bash
cd backend
dotnet restore
```

### 2.3 Gerar a migration inicial

```bash
dotnet ef migrations add InitialCreate
```

### 2.4 Aplicar a migration no banco

```bash
dotnet ef database update
```

> **Dica:** Toda vez que você mudar um Model (ex: adicionar campo), rode:
> ```bash
> dotnet ef migrations add NomeDaAlteracao
> dotnet ef database update
> ```

### 2.5 Iniciar o backend

```bash
dotnet run
```

O backend fica em `http://localhost:5000`.
Swagger disponível em `http://localhost:5000/swagger`.

---

## 3 — Configurar o Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend fica em `http://localhost:5173`.

---

## 4 — Usar

1. Acesse `http://localhost:5173`
2. Clique em **Criar conta** para registrar um usuário
3. Faça login e você será redirecionado para o Dashboard
4. O token JWT é salvo no `localStorage` automaticamente

---

## Endpoints da API

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/auth/login` | Não | Login, retorna JWT |
| POST | `/api/auth/register` | Não | Registro, retorna JWT |
| GET | `/api/auth/me` | Sim | Dados do usuário logado |

---

## Variáveis de ambiente / configurações

Tudo fica em `backend/appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=skeleton_db;Username=postgres;Password=postgres"
  },
  "Jwt": {
    "Key": "TROQUE_ESTA_CHAVE_POR_UMA_SEGURA_COM_32_CARACTERES_MINIMO",
    "Issuer": "SkeletonApp",
    "Audience": "SkeletonApp",
    "ExpiresInMinutes": 60
  }
}
```

> **Importante:** Troque o valor de `Jwt:Key` por uma string aleatória de pelo menos 32 caracteres antes de colocar em produção.

---

## Adicionando novas entidades (passo a passo)

1. Crie o Model em `backend/Models/`
2. Adicione o `DbSet<SuaEntidade>` no `AppDbContext.cs`
3. Rode `dotnet ef migrations add AdicionarSuaEntidade`
4. Rode `dotnet ef database update`
5. Crie o Controller em `backend/Controllers/`

---

## Build para produção

**Backend:**
```bash
cd backend
dotnet publish -c Release -o ./publish
```

**Frontend:**
```bash
cd frontend
npm run build
# Arquivos gerados em frontend/dist/
```
