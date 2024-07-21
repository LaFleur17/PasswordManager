# Utilisez une image de base officielle de Node.js pour builder l'application frontend
FROM node:20 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/frontend

# Copier les fichiers package.json et package-lock.json (ou yarn.lock) dans le répertoire de travail
COPY package.json package-lock.json ./

# Installer les dépendances du frontend
RUN npm install

# Copier le reste des fichiers de l'application frontend
COPY . .

# Construire l'application frontend pour la production
RUN npm run build

# Utiliser une image de base pour servir les fichiers statiques
FROM nginx:alpine

# Copier les fichiers construits dans le répertoire par défaut de Nginx
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Exposer le port sur lequel Nginx écoute
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
