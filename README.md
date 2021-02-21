# :rocket: Monorepo - Relay and GraphQL

## :exclamation: Requirements

- Docker
- Node >= 10
- Yarn

## :computer: Getting started

### Development mode

- `yarn install`: Installs workspace dependencies
- Don't forget to copy/paste the `.env.example` files to `.env` (there is no need to change them for now)
- `yarn start`: Starts the project
- Open the webapp at `http://localhost:8081`

### Using Nginx on Development mode

- `yarn install-dependencies`: Installs workspace dependencies using Node
  - Take a look at `.env.development` file in `/packages/web/`
- Don't forget to copy/paste the `.env.example` files to `.env` (there is no need to change them for now)
- `yarn start`: Starts the project
- Open the webapp at `http://webapp.example.com.br`

### Stopping

- `yarn stop`: Stops the project (`docker-compose down`)
