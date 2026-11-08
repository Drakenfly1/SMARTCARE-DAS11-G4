
const medicaments = require("../models/medicamentModel");

// Afficher tous les médicaments
exports.getAllMedicaments = (req, res) => {
  res.status(200).json(medicaments);
};

// Rechercher un médicament
exports.getMedicamentById = (req, res) => {
  const id = Number(req.params.id);

  const medicament = medicaments.find(m => m.id === id);

  if (!medicament) {
    return res.status(404).json({
      message: "Médicament introuvable"
    });
  }

  res.status(200).json(medicament);
};

// Ajouter un médicament
exports.createMedicament = (req, res) => {
  const { nom, quantite, prix, dateExpiration } = req.body;

  if (
    typeof nom !== "string" || !nom.trim() ||
    !Number.isInteger(quantite) || quantite < 0 ||
    typeof prix !== "number" || !Number.isFinite(prix) || prix < 0 ||
    !dateExpiration || isNaN(Date.parse(dateExpiration))
  ) {
    return res.status(400).json({
      message: "Données du médicament invalides"
    });
  }

  const nouveau = {
    id: medicaments.reduce((max, m) => Math.max(max, m.id), 0) + 1,
    nom: nom.trim(),
    quantite,
    prix,
    dateExpiration
  };

  medicaments.push(nouveau);

  res.status(201).json(nouveau);
};

// Modifier un médicament
exports.updateMedicament = (req, res) => {
  const id = Number(req.params.id);
  const medicament = medicaments.find(m => m.id === id);

  if (!medicament) {
    return res.status(404).json({
      message: "Médicament introuvable"
    });
  }

  const { nom, quantite, prix, dateExpiration } = req.body;

  if (
    typeof nom !== "string" || !nom.trim() ||
    !Number.isInteger(quantite) || quantite < 0 ||
    typeof prix !== "number" || !Number.isFinite(prix) || prix < 0 ||
    !dateExpiration || isNaN(Date.parse(dateExpiration))
  ) {
    return res.status(400).json({
      message: "Données du médicament invalides"
    });
  }

  Object.assign(medicament, {
    nom: nom.trim(),
    quantite,
    prix,
    dateExpiration
  });

  res.status(200).json(medicament);
};

// Supprimer un médicament
exports.deleteMedicament = (req, res) => {
  const id = Number(req.params.id);
  const index = medicaments.findIndex(m => m.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Médicament introuvable"
    });
  }

  medicaments.splice(index, 1);

  res.status(200).json({
    message: "Médicament supprimé avec succès"
  });
};
