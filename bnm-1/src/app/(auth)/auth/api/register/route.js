import { generateRandomString } from "@/app/_libs/datas";
import executeQuery from "@/app/_utils/db";
import bcrypt from "bcryptjs/dist/bcrypt";
export async function POST(request) {
    try {
        async function checkEmailUniqueness(user_email) {
            // Vérifier si l'email est unique dans la base de données
            try {
                const rows = await executeQuery(`SELECT * FROM users WHERE email=? `, [user_email]);

                // Retourner true si l'email est unique, false sinon
                let exist_user
                if (rows[0] == null) {
                    exist_user = 'true'
                }
                else {
                    exist_user = 'false'
                }
                return exist_user
            } catch (error) {
                console.error('error in sql for checking Mail', error)
            }
        }

        const data = await request.json();
        const nom = data.nom;
        const prenom = data.prenom;
        const telephone = data.phone;
        const email = data.email;
        const role = data.role_user;
        const password = data.password;
        const username = nom.toLowerCase()+'_'+generateRandomString(5)

        const isUnique = await checkEmailUniqueness(email);
        if (isUnique !== 'true') {
            return new Response(JSON.stringify({ data: 'errorMail', message: 'Email déjà utilisé.' }));
        }
        const saltrounds = 10
        const salt = await bcrypt.genSalt(saltrounds)
        const hashedPassword = await bcrypt.hash(password, salt);
        const res = await executeQuery(
            "INSERT INTO users (name,lastname,username,passcode,phone,email,role) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [nom, prenom, username, hashedPassword, telephone, email, role]
        );
        console.log("The insertion queryResponse:", res)
        if (res) {
            console.log('Success response data:', res)
            return new Response(JSON.stringify({ data: res[0], message: "Success" }));
        }
        else {
            console.log('Error response data:', res)
            return new Response(JSON.stringify({ message: "Erreur, utilisateur non enregistré", response: "Nothing in response" }))
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Erreur, veuillez réessayer" }))
    }
}