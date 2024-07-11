# Utiliser une image Node.js comme base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app/backend

# Copier les fichiers nécessaires
COPY package.json package-lock.json .

# Installer les dépendances
RUN npm install 

# Copier le reste des fichiers de l'application backend
COPY . .

# Exposer le port sur lequel le serveur backend écoute
EXPOSE 3001