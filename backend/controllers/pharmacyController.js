const Pharmacy = require('../models/Pharmacy');
const Medicine = require('../models/Medicine');

const getAllPharmacies = async (req, res) => {
  try {
    const pharmacies = await Pharmacy.find().populate('medicines.medicineId');
    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPharmacyById = async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id)
      .populate('medicines.medicineId');

    if (!pharmacy) {
      return res.status(404).json({ error: 'Pharmacy not found' });
    }
    res.json(pharmacy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkMedicineAvailability = async (req, res) => {
  try {
    const { medicineName } = req.body;

    const pharmacies = await Pharmacy.find({
      'medicines.medicineId': { $exists: true }
    }).populate('medicines.medicineId');

    const results = pharmacies
      .map(pharmacy => {
        const matchingMedicines = pharmacy.medicines.filter(m =>
          m.medicineId &&
          m.medicineId.name.toLowerCase().includes(medicineName.toLowerCase())
        );
        return {
          pharmacyId: pharmacy._id,
          pharmacyName: pharmacy.name,
          address: pharmacy.address,
          medicines: matchingMedicines,
        };
      })
      .filter(pharmacy => pharmacy.medicines.length > 0); // Only return pharmacies that have the medicine

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPharmacies,
  getPharmacyById,
  checkMedicineAvailability,
  getMedicines,
};