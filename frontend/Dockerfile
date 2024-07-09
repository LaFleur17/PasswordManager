# Utiliser une image Node.js pour le build du frontend
FROM node:14 as build

# Définir le répertoire de travail pour le build
WORKDIR /app/frontend

# Copier les fichiers nécessaires
COPY package.json ./
COPY package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application frontend
COPY  . .

# Build de l'application React
RUN npm run build

# Étape finale, utiliser Nginx pour servir l'application construite
FROM nginx:1.21

# Copier les fichiers buildés depuis le stage de build vers Nginx
COPY --from=build /app/frontend/build /usr/share/nginx/html

# Exposer le port HTTP par défaut de Nginx
EXPOSE 80

# Commande par défaut pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]

