# frontend/Dockerfile

# Utiliser une image Node.js officielle comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier tout le code source dans le répertoire de travail du conteneur
COPY . .

# Construire l'application React pour la production
RUN npm run build

# Utiliser une image nginx pour servir l'application React
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html

# Exposer le port sur lequel nginx écoute
EXPOSE 80

# Commande pour démarrer nginx
CMD ["nginx", "-g", "daemon off;"]

