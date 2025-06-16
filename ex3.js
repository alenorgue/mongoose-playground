const { connect } = require('http2');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/teknom`);

    const patientSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 30
        },
        lastName: {
             type: String,
            required: true,
            minlength: 2,
            maxlength: 30
        },
        birthDate: {
            type: Date,
            required: true
        },
        bloodType: {
            type: String,
            required: false,
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
        },
        phone: {
            type: String,
            required: true,
            match: /^\d{9}$/
        },
        address: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            zip: {
                type: String,
                required: true,
                match: /^\d{5}$/
            }
        },
        patientStatus: {
            type: String,
            enum: ['active', 'inactive']
        },
        allergies: {
            type: [String],
            required: false
        }
    });

    const Patient = mongoose.model('Patient', patientSchema);

    const juana = new Patient({
        firstName: "Juana",
        lastName: "Pérez",
        birthDate: new Date("1980-03-21"),
        bloodType: "A+",
        phone: "612345678",
        address: {
            street: "Fake Street 123",
            city: "Platja d'Aro",
            zip: "17250"
        },
        allergies: ["penicillin"]
    });

    const andres = new Patient({
        firstName: "Andrés",
        lastName: "Gómez",
        birthDate: new Date("1995-07-15"),
        bloodType: "O-",
        phone: "698765432",
        address: {
            street: "Calle Falsa 456",
            city: "Barcelona",
            zip: "08001"
        },
        patientStatus: "active"
    });
    const maria = new Patient({
        firstName: "María",
        lastName: "López",
        birthDate: new Date("2000-12-01"),
        phone: "612345678",
        address: {
            street: "Avenida Siempre Viva 789",
            city: "Madrid",
            zip: "28001"
        },
        allergies: ["pollen", "nuts"],
        patientStatus: "inactive"
    });
    const juan = new Patient({
        firstName: "Juan",
        lastName: "Martínez",
        birthDate: new Date("1985-05-10"),
        bloodType: "B+",
        phone: "612345678",
        address: {
            street: "Calle del Sol 321",
            city: "Valencia",
            zip: "46001"
        },
        patientStatus: "active"
    });

      const john = new Patient({
        firstName: "John",
        birthDate: new Date("1980-03-21"),
        phone: "1234",
        address: {
            street: "Fake Street 123",
            city: "Platja d'Aro",
            zip: "17250"
        },
        allergies: ["penicillin"]
    });

     const pepe = new Patient({
        firstName: "Pepe",
        lastName: "Pérez",
        birthDate: new Date("1980-03-21"),
        phone: "1234",
        address: {
            street: "Fake Street 123",
            city: "Platja d'Aro",
            zip: "17250"
        },
        allergies: ["penicillin"]
    });


    try {await pepe.save();}
    catch (error) {
        console.error("Error al insertar el paciente:", error.message);
        return;
    }
   

    console.log("Paciente insertado en la base de datos correctamente");
}

