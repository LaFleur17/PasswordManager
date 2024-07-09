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
COPY  frontend .

# Build de l'application React
RUN npm run build

# Exposer le port HTTP par défaut de Nginx
EXPOSE 3001

# Commande par défaut pour démarrer Nginx
CMD ["npm", "start"]

