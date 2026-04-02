const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
const User = require('./models/User');
const Medicine = require('./models/Medicine');
const Pharmacy = require('./models/Pharmacy');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Doctor.deleteMany({});
    await Medicine.deleteMany({});
    await Pharmacy.deleteMany({});

    // Clear existing doctor users to avoid duplicate email errors
    await User.deleteMany({ role: 'doctor' });

    const doctorUserData = [
      { name: 'Dr. Rajesh Kumar', email: 'rajesh@example.com', password: 'Doctor@123', phone: '9876543210', role: 'doctor', address: 'Delhi, India' },
      { name: 'Dr. Priya Sharma', email: 'priya@example.com', password: 'Doctor@123', phone: '9876543211', role: 'doctor', address: 'Mumbai, India' },
      { name: 'Dr. Anil Verma', email: 'anil@example.com', password: 'Doctor@123', phone: '9876543212', role: 'doctor', address: 'Bangalore, India' },
      { name: 'Dr. Sunita Patel', email: 'sunita@example.com', password: 'Doctor@123', phone: '9876543213', role: 'doctor', address: 'Ahmedabad, India' },
    ];

    const doctorUsers = [];
    for (const data of doctorUserData) {
      const u = new User(data);
      await u.save(); // triggers pre-save password hashing
      doctorUsers.push(u);
    }

    console.log('Doctor users created:', doctorUsers.length);

    const doctors = await Doctor.insertMany([
      {
        userId: doctorUsers[0]._id,
        specialization: 'Cardiologist',
        licenseNumber: 'LIC001',
        experience: 10,
        qualification: ['MBBS', 'MD (Cardiology)'],
        consultationFee: 500,
        rating: 4.5,
        isVerified: true,
        isAvailable: true,
      },
      {
        userId: doctorUsers[1]._id,
        specialization: 'Dermatologist',
        licenseNumber: 'LIC002',
        experience: 8,
        qualification: ['MBBS', 'MD (Dermatology)'],
        consultationFee: 400,
        rating: 4.2,
        isVerified: true,
        isAvailable: true,
      },
      {
        userId: doctorUsers[2]._id,
        specialization: 'General Physician',
        licenseNumber: 'LIC003',
        experience: 12,
        qualification: ['MBBS', 'MD'],
        consultationFee: 300,
        rating: 4.6,
        isVerified: true,
        isAvailable: true,
      },
      {
        userId: doctorUsers[3]._id,
        specialization: 'Pediatrician',
        licenseNumber: 'LIC004',
        experience: 15,
        qualification: ['MBBS', 'MD (Pediatrics)'],
        consultationFee: 450,
        rating: 4.8,
        isVerified: true,
        isAvailable: true,
      },
    ]);

    console.log('Doctors created:', doctors.length);

    const medicines = await Medicine.insertMany([
      { name: 'Aspirin', genericName: 'Acetylsalicylic acid', strength: '500mg', form: 'tablet', manufacturer: 'Bayer', price: 10 },
      { name: 'Amoxicillin', genericName: 'Amoxicillin', strength: '500mg', form: 'capsule', manufacturer: 'GSK', price: 50 },
      { name: 'Paracetamol', genericName: 'Acetaminophen', strength: '650mg', form: 'tablet', manufacturer: 'Crocin', price: 15 },
      { name: 'Ibuprofen', genericName: 'Ibuprofen', strength: '400mg', form: 'tablet', manufacturer: 'Brufen', price: 20 },
      { name: 'Metformin', genericName: 'Metformin', strength: '500mg', form: 'tablet', manufacturer: 'Cipla', price: 25 },
      { name: 'Omeprazole', genericName: 'Omeprazole', strength: '20mg', form: 'capsule', manufacturer: 'Cipla', price: 35 },
      { name: 'Lisinopril', genericName: 'Lisinopril', strength: '10mg', form: 'tablet', manufacturer: 'Lupin', price: 45 },
      { name: 'Cetirizine', genericName: 'Cetirizine', strength: '10mg', form: 'tablet', manufacturer: 'Sun Pharma', price: 12 },
    ]);

    console.log('Medicines created:', medicines.length);

    const pharmacies = await Pharmacy.insertMany([
      {
        name: 'Apollo Pharmacy',
        address: 'Connaught Place, Delhi, India',
        phone: '8800000001',
        latitude: 28.6139,
        longitude: 77.209,
        operatingHours: '9:00 AM - 10:00 PM',
        rating: 4.5,
        medicines: [
          { medicineId: medicines[0]._id, quantity: 100, price: 10 },
          { medicineId: medicines[1]._id, quantity: 50, price: 50 },
          { medicineId: medicines[2]._id, quantity: 150, price: 15 },
          { medicineId: medicines[3]._id, quantity: 80, price: 20 },
          { medicineId: medicines[4]._id, quantity: 120, price: 25 },
        ],
      },
      {
        name: 'CVS Pharmacy',
        address: 'Marine Drive, Mumbai, India',
        phone: '8800000002',
        latitude: 19.0760,
        longitude: 72.8777,
        operatingHours: '8:00 AM - 11:00 PM',
        rating: 4.3,
        medicines: [
          { medicineId: medicines[2]._id, quantity: 200, price: 15 },
          { medicineId: medicines[0]._id, quantity: 90, price: 10 },
          { medicineId: medicines[5]._id, quantity: 60, price: 35 },
          { medicineId: medicines[6]._id, quantity: 75, price: 45 },
          { medicineId: medicines[7]._id, quantity: 110, price: 12 },
        ],
      },
      {
        name: 'Med Plus Pharmacy',
        address: 'Koramangala, Bangalore, India',
        phone: '8800000003',
        latitude: 12.9352,
        longitude: 77.6245,
        operatingHours: '7:00 AM - 10:00 PM',
        rating: 4.4,
        medicines: [
          { medicineId: medicines[1]._id, quantity: 70, price: 50 },
          { medicineId: medicines[3]._id, quantity: 95, price: 20 },
          { medicineId: medicines[4]._id, quantity: 140, price: 25 },
          { medicineId: medicines[5]._id, quantity: 85, price: 35 },
          { medicineId: medicines[6]._id, quantity: 100, price: 45 },
        ],
      },
      {
        name: 'Wellness Pharmacy',
        address: 'Camp, Pune, India',
        phone: '8800000004',
        latitude: 18.5204,
        longitude: 73.8567,
        operatingHours: '8:30 AM - 9:30 PM',
        rating: 4.2,
        medicines: [
          { medicineId: medicines[0]._id, quantity: 110, price: 10 },
          { medicineId: medicines[2]._id, quantity: 160, price: 15 },
          { medicineId: medicines[4]._id, quantity: 130, price: 25 },
          { medicineId: medicines[7]._id, quantity: 100, price: 12 },
          { medicineId: medicines[5]._id, quantity: 70, price: 35 },
        ],
      },
      {
        name: 'Care Pharmacy',
        address: 'Sector 18, Noida, India',
        phone: '8800000005',
        latitude: 28.5921,
        longitude: 77.3758,
        operatingHours: '9:00 AM - 10:00 PM',
        rating: 4.1,
        medicines: [
          { medicineId: medicines[0]._id, quantity: 125, price: 10 },
          { medicineId: medicines[1]._id, quantity: 65, price: 50 },
          { medicineId: medicines[3]._id, quantity: 88, price: 20 },
          { medicineId: medicines[6]._id, quantity: 95, price: 45 },
          { medicineId: medicines[7]._id, quantity: 130, price: 12 },
        ],
      },
    ]);

    console.log('Pharmacies created:', pharmacies.length);
    console.log('\n=== Database seeded successfully! ===');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();