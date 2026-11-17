
const mongoose = require("mongoose");
const Dispensation = require("../models/Dispensation");

// GET : afficher toutes les délivrances
exports.getAllDispensations = async (req, res) => {
  try {
    const dispensations = await Dispensation.find()
      .sort({ createdAt: -1 });

    res.status(200).json(dispensations);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération"
    });
  }
};

// GET : afficher une délivrance par ID
exports.getDispensationById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        message: "Identifiant invalide"
      });
    }

    const dispensation = await Dispensation.findById(
      req.params.id
    );

    if (!dispensation) {
      return res.status(404).json({
        message: "Délivrance introuvable"
      });
    }

    res.status(200).json(dispensation);
  } catch (error) {
    res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};

// POST : enregistrer une demande en attente
exports.createDispensation = async (req, res) => {
  try {
    const { prescriptionId, pharmacistId } = req.body;

    if (!mongoose.isValidObjectId(prescriptionId)) {
      return res.status(400).json({
        message: "Identifiant de prescription invalide"
      });
    }

    if (
      typeof pharmacistId !== "string" ||
      !pharmacistId.trim()
    ) {
      return res.status(400).json({
        message: "Identifiant du pharmacien obligatoire"
      });
    }

    // Provisoire : en attente de vérification
    // auprès du microservice E-Prescription
    const dispensation = await Dispensation.create({
      prescriptionId,
      pharmacistId: pharmacistId.trim(),
      status: "PENDING"
    });

    res.status(201).json(dispensation);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création"
    });
  }
};


// annuler une demande de délivrance

exports.cancelDispensation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Identifiant invalide"
      });
    }

    const dispensation = await Dispensation.findOneAndUpdate(
      {
        _id: id,
        status: "PENDING"
      },
      {
        $set: { status: "CANCELLED" }
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!dispensation) {
      const existing = await Dispensation.findById(id);

      if (!existing) {
        return res.status(404).json({
          message: "Délivrance introuvable"
        });
      }

      return res.status(409).json({
        message: "Cette délivrance ne peut plus être annulée",
        status: existing.status
      });
    }

    return res.status(200).json({
      message: "Demande de délivrance annulée",
      dispensation
    });

  } catch (error) {
    console.error("Erreur annulation :", error);

    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};


//  préparer la confirmation d'une délivrance. 
// La confirmation effective sera intégrée ensuite.

exports.confirmDispensation = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier le format de l'identifiant
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Identifiant de délivrance invalide"
      });
    }

    // Rechercher la demande
    const dispensation = await Dispensation.findById(id);

    if (!dispensation) {
      return res.status(404).json({
        message: "Délivrance introuvable"
      });
    }

    // Vérifier que la demande est en attente
    if (dispensation.status !== "PENDING") {
      return res.status(409).json({
        message: "Cette délivrance ne peut pas être confirmée",
        status: dispensation.status
      });
    }

    // Confirmation non encore disponible
    // Il faut d'abord vérifier la prescription auprès du MS3,
    // contrôler les stocks et garantir la cohérence des écritures.
    return res.status(503).json({
      message: "Confirmation temporairement indisponible",
      reason: "Intégration E-Prescription en attente",
      dispensationId: dispensation._id,
      status: dispensation.status
    });

  } catch (error) {
    console.error("Erreur confirmation :", error);

    return res.status(500).json({
      message: "Erreur interne du serveur"
    });
  }
};
