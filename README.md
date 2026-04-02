# SwasthSetu - Telemedicine Platform

A comprehensive telemedicine platform providing healthcare services for rural communities.

## Features

- 👨‍⚕️ Doctor Consultations (Video, Audio, Text)
- 📋 Health Records Management
- 💊 Prescription Management
- 🏥 Pharmacy Services
- 🔍 Symptom Checker (AI-powered)
- 👤 User Profiles
- 📱 Responsive Design

## Tech Stack

**Backend:**
- Node.js with Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

**Frontend:**
- React.js
- Material-UI (MUI)
- React Router
- Axios

## Project Structure

```
telemedicine-platform/
├── backend/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── tests/
│   ├── utils/
│   ├── server.js
│   ├── seedData.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── config/
    │   ├── context/
    │   ├── hooks/
    │   ├── pages/
    │   ├── api/
    │   ├── styles/
    │   ├── utils/
    │   ├── App.jsx
    │   └── index.js
    └── package.json
```

## API Endpoints (29 Total)

### Authentication (4)
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/validate
- POST /api/auth/logout

### Doctors (5)
- GET /api/doctors
- GET /api/doctors/:id
- GET /api/doctors/available
- GET /api/doctors/:id/availability
- PUT /api/doctors/:id/availability

### Consultations (6)
- POST /api/consultations/book
- GET /api/consultations/:id
- GET /api/consultations/user/:userId
- GET /api/consultations/pending/:doctorId
- PUT /api/consultations/:id
- DELETE /api/consultations/:id

### Health Records (5)
- GET /api/health-records/:patientId
- POST /api/health-records
- GET /api/health-records/record/:id
- PUT /api/health-records/:id
- GET /api/consultations/:patientId/history

### Prescriptions (3)
- POST /api/prescriptions
- GET /api/prescriptions/:id
- GET /api/prescriptions/patient/:patientId

### Pharmacies (4)
- GET /api/pharmacies
- GET /api/pharmacies/:id
- POST /api/pharmacies/check-availability
- GET /api/medicines

### Users (2)
- GET /api/users/:id
- PUT /api/users/:id

### Symptom Checker (3)
- POST /api/symptom-checker/analyze
- POST /api/symptom-checker/store
- GET /api/symptom-checker/:assessmentId

## Database Schema

**Collections:**
- Users
- Doctors
- Consultations
- HealthRecords
- Prescriptions
- Medicines
- Pharmacies
- SymptomAssessments

## Deployment

**Frontend:** Vercel / Netlify  
**Backend:** Heroku / Railway  
**Database:** MongoDB Atlas

## License

MIT License
