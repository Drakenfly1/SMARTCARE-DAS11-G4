
const Category = require("../models/Category");

// afficher toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// rechercher une catégorie par ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Catégorie introuvable"
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: "Identifiant invalide" });
  }
};

// créer une catégorie
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// modifier une catégorie
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({
        message: "Catégorie introuvable"
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// supprimer une catégorie
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Catégorie introuvable"
      });
    }

    res.status(200).json({
      message: "Catégorie supprimée"
    });
  } catch (error) {
    res.status(400).json({ message: "Identifiant invalide" });
  }
};
