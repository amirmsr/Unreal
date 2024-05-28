# Amir Mansour Iyad Auckburally Yasser Hathat

**Documentation Technique : Application de Chat avec Capacitor, Ionic et Firebase**



### Introduction
Cette documentation technique vise à fournir une compréhension approfondie du projet, ainsi que des instructions détaillées sur la configuration et le déploiement de l'application, développée avec Ionic, React JS et Capacitor. Le projet utilise Firebase comme base de données pour le stockage des données utilisateur et des médias.

### Technologies Utilisées
- Ionic : Framework de développement d'applications mobiles hybrides basé sur Angular, React ou Vue. (Nous avons opté pour React)
- React JS : Bibliothèque JavaScript pour la construction d'interfaces utilisateur.
- Capacitor : Outil pour la construction d'applications mobiles multiplateformes en utilisant des technologies web.
- Firebase : Plateforme de développement d'applications mobiles de Google, fournissant des services de base de données en temps réel, d'authentification, de stockage de fichiers, etc.

### Configuration de Firebase
- **Authentification** : Gestion sécurisée de l'inscription et de la connexion des utilisateurs.
- **Firestore Database** : Stockage des messages et autres données de l'application.
- **Storage** : Stockage sécurisé des images et autres fichiers téléchargés par les utilisateurs.


### Lancement du Projet
1. Accédez au répertoire du projet.

2. Installez les dépendances npm.

```
npm install
```
3. Lancez l'application.

```
ionic serve
```

### Utilisation de Capacitor pour la Caméra
1. Capacitor permet d'accéder aux fonctionnalités natives des appareils mobiles, y compris la caméra.
2. Utilisation des API Capacitor pour accéder à la caméra et prendre des photos dans notre application Ionic.

### Fonctionnalités Principales de l'Application
1. **Envoi de Story** : Les utilisateurs peuvent capturer et envoyer des photos en utilisant la caméra de leur appareil.
2. **Chat en Direct + envoi de photo** : L'application prend en charge un chat en direct permettant à un ou plusieurs utilisateurs de converser et d'échanger des images en temps réel.
3. **CRUD sur les utilisateurs** : Si l'utilisateur est un admin, ce dernier peut effectuer des actions crud sur les utilisateurs de l'applications

### Conclusion
Cette documentation technique fournit un aperçu du projet, des instructions pour le lancement et des informations sur l'utilisation des principales fonctionnalités. 
--- 