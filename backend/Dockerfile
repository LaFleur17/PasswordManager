# Utilisez une image de base officielle de Node.js
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/backend

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package.json package-lock.json ./

# Installer les dépendances du backend
RUN npm install

# Copier le reste des fichiers de l'application backend
COPY . .

# Exposer le port sur lequel le backend écoute
EXPOSE 3000

# Démarrer l'application backend
CMD ["npm", "start"]
