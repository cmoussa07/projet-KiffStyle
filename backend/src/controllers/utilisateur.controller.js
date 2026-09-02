const {
  creerUtilisateur,
  trouverUtilisateurParEmail,
  trouverUtilisateurParId,
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

    const utilisateur = await creerUtilisateur({
      nom,
      email,
      mot_de_passe,
    });

    res.status(201).json(utilisateur);
  } catch (err) {
    console.error("Erreur PostgreSQL :", err);

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

module.exports = {
  inscrireUtilisateur,
  connecterUtilisateur,
  obtenirProfil,
};
