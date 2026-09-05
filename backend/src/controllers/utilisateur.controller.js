const {
  creerUtilisateur,
  trouverUtilisateurParEmail,
  trouverUtilisateurParId,
  modifierUtilisateur,
  remplacerMotDePasse,
  supprimerUtilisateur,
} = require("../services/utilisateur.service");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function inscrireUtilisateur(req, res) {
  try {
    const { nom, email, mot_de_passe } = req.body;

    if (!nom || !email || !mot_de_passe) {
      return res.status(400).json({
        message: "Nom, email et mot de passe sont obligatoires",
      });
    }

    // Vérification de la validité de l'adresse email avec une expression régulière (regex)
    const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValide) {
      return res.status(400).json({
        message: "Adresse email invalide",
      });
    }

    if (mot_de_passe.length < 8) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 8 caractères",
      });
    }

    const utilisateur = await creerUtilisateur({
      nom,
      email,
      mot_de_passe,
    });

    res.status(201).json({
      message: "Inscription réussie",
      utilisateur: utilisateur,
    });
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    // Vérification des erreurs de contrainte d'unicité pour l'email
    if (err.code === "23505") {
      return res.status(409).json({
        message: "Cette adresse email est déjà utilisée",
      });
    }

    res.status(500).json({
      message: "Erreur lors de l'inscription",
    });
  }
}

async function connecterUtilisateur(req, res) {
  try {
    const { email, mot_de_passe } = req.body;

    if (!email || !mot_de_passe) {
      return res.status(400).json({
        message: "Email et mot de passe obligatoires",
      });
    }

    const utilisateur = await trouverUtilisateurParEmail(email);

    if (!utilisateur) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const motDePasseCorrect = await bcrypt.compare(
      mot_de_passe,
      utilisateur.mot_de_passe,
    );

    if (!motDePasseCorrect) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    const token = jwt.sign(
      {
        id: utilisateur.id,
        role: utilisateur.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Connexion réussie",
      token,
      utilisateur: {
        id: utilisateur.id,
        nom: utilisateur.nom,
        email: utilisateur.email,
        role: utilisateur.role,
      },
    });
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    res.status(500).json({
      message: "Erreur lors de la connexion",
    });
  }
}

async function obtenirProfil(req, res) {
  try {
    const id = Number(req.utilisateur.id);

    const utilisateur = await trouverUtilisateurParId(id);

    if (!utilisateur) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    res.status(200).json(utilisateur);
  } catch (err) {
    console.error(
      `Erreur PostgreSQL pour utilisateur ID=${req.utilisateur.id} :`,
      err,
    );
    res.status(500).json({
      message: "Erreur lors de la récupération du profil",
    });
  }
}

async function modifierProfil(req, res) {
  try {
    const id = req.utilisateur.id;

    const { nom, email } = req.body;

    if (!req.body || !nom || !email) {
      return res.status(400).json({
        message: "Données de l'utilisateur incomplètes",
      });
    }

    const utilisateur = await modifierUtilisateur(id, req.body);

    if (!utilisateur) {
      return res.status(404).json({
        message: "utilisateur non trouvé",
      });
    }

    res.status(200).json({
      message: "Profil modifié avec succès",
      utilisateur: utilisateur,
    });
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    res.status(500).json({
      message: "Erreur lors de la mise à jour de l'utilisateur",
    });
  }
}

async function modifierMotDePasse(req, res) {
  try {
    const id = req.utilisateur.id;

    const { ancien_mot_de_passe, nouveau_mot_de_passe } = req.body;

    if (!req.body || !ancien_mot_de_passe || !nouveau_mot_de_passe) {
      return res.status(400).json({
        message: "Tous les champs sont obligatoires",
      });
    }

    const utilisateur = await remplacerMotDePasse(
      id,
      ancien_mot_de_passe,
      nouveau_mot_de_passe,
    );

    if (!utilisateur) {
      return res.status(404).json({
        message: "utilisateur non trouvé",
      });
    }

    if (utilisateur.erreur === "Ancien mot de passe incorrect") {
      return res.status(401).json({
        message: "Ancien mot de passe incorrect",
      });
    }

    res.status(200).json({
      message: "Mot de passe modifié avec succès",
      utilisateur: utilisateur,
    });
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    res.status(500).json({
      message: "Erreur lors de la modification du mot de passe",
    });
  }
}

async function supprimerMonCompte(req, res) {
  try {
    const id = req.utilisateur.id;

    const utilisateurSupprime = await supprimerUtilisateur(id);

    if (!utilisateurSupprime) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({
      message: "Compte supprimé avec succès",
      utilisateur: utilisateurSupprime,
    });
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

    res.status(500).json({
      message: "Erreur lors de la suppression du compte",
    });
  }
}

module.exports = {
  inscrireUtilisateur,
  connecterUtilisateur,
  obtenirProfil,
  modifierProfil,
  modifierMotDePasse,
  supprimerMonCompte,
};
