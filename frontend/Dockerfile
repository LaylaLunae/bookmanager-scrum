# Étape 1 : Build de l'application
FROM node:20-alpine AS build
WORKDIR /app

# Installation de pnpm
RUN npm i -g pnpm

# Copie UNIQUEMENT du package.json
COPY package.json ./

# CONFIGURATION ICI : Force pnpm à créer un dossier node_modules plat et standard
RUN pnpm config set node-linker hoisted
RUN pnpm install

# Copie du reste du code
COPY . .

# Build
RUN pnpm run build

# Étape 2 : Serveur de production (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]