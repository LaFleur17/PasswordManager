# PasswordManager

PasswordManager
Description
PasswordManager est une application sécurisée de gestion de mots de passe, conçue pour stocker et gérer les mots de passe des utilisateurs de manière sécurisée en utilisant des techniques de chiffrement avancées. Cette application permet aux utilisateurs de gérer leurs identifiants et mots de passe pour différents services, tout en assurant leur confidentialité et leur sécurité.

Fonctionnalités
Authentification Utilisateur : Inscription, connexion et gestion des sessions utilisateur.
Gestion des Mots de Passe : Ajouter, modifier et supprimer des mots de passe pour différents services.
Chiffrement Sécurisé : Utilisation de l'algorithme AES-256-GCM pour le chiffrement et le déchiffrement des mots de passe.
Partage de Mots de Passe : Option pour partager des mots de passe avec d'autres utilisateurs de manière sécurisée.
Recherche et Filtrage : Recherche de mots de passe par service, tags ou nom d'utilisateur.
Interface Utilisateur : Interface utilisateur conviviale et responsive.
Technologies Utilisées
Backend :

Node.js
Express.js
Mongoose (ODM pour MongoDB)
JSON Web Tokens (JWT) pour l'authentification
bcrypt pour le hachage des mots de passe utilisateur
crypto pour le chiffrement et le déchiffrement
Frontend :

React.js
Redux pour la gestion de l'état global
Material-UI pour les composants de l'interface utilisateur
Base de Données :

MongoDB (via MongoDB Atlas)
