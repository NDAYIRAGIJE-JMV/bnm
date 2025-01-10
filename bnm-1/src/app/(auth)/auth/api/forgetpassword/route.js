import executeQuery from "@/app/_utils/db";
import { transporter } from "@/app/_utils/email";
export async function POST(request) {


  async function checkEmailExist(email) {
    // Vérifier si l'email est unique dans la base de données
    try {
      // Exécuter la requête SQL pour récupérer les videos
      const rows = await executeQuery(`SELECT * FROM users WHERE email=? `, [email]);

      // Retourner true si l'email est unique, false sinon
      let mess = ""
      if (rows[0] == null) {
        mess = "false"
        return mess
      }
      else {
        mess = "true"
        return mess
      }
    } catch (error) {
      console.error('error in sql for checking Mail', error)
    }
  }
  try {
    const data = await request.json();
    const userMail = data.email
    const isExist = await checkEmailExist(userMail);
    if (isExist == "false") {
      return new Response(JSON.stringify({ data: 'errorMail', message: "Erreur email n\'existe pas.", error: 'Email n\'existe pas.' }));
    }
    else {
      //Envoie d'Email pour la validation du compte
      const mailOptions = {
        from: 'mugisheloge@gmail.com',
        to: userMail,
        subject: 'Changement de mot de Passe dans BNM',
        html: `
                <html>
                  <head>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                        color: black;
                        line-height: 1.5;
                      }
                      
                      .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                      }
                      
                      .header {
                        color:black;
                        margin-bottom: 20px;
                      }
                      
                      .button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #3a86ff;
                        color: white;
                        text-decoration: none;
                        border-radius: 4px;
                        font-size: 16px;
                        border: none;
                        cursor: pointer;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="header">
                      <h2>Changement de mot de Passe</h2>
                      <p>Bonjour,</p>
                      <p>Vous souhaitez modifier votre mot de passe du compte ${userMail}?</p>
                      <p>C'est une excellente initiative pour renforcer la sécurité de votre compte.</p>
                      <p>Pour procéder à cette modification, veuillez cliquer sur le bouton en dessous :</p>
                      </div>
                      <div class="button" style="text-decoration: none; color: white; ">
                        <a href="${process.env.NEXT_PUBLIC_URL}/auth/reset-password?mail=${userMail}" style="text-decoration: none; color: white;">
                        Clique ici
                        </a>
                      </div>
                    </div>
                  </body>
                </html>
               `,

      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return new Response(JSON.stringify({ data: error, message: 'Erreur dans l\'envoi d\'email veuillez réessayer' }));
        } else {
          console.log('E-mail envoyé: ' + info.response);
        }
      });

      // Renvoyer les résultats de la requête sous forme de réponse JSON
      return new Response(JSON.stringify({ message: 'Success' }))

    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ data: error, message: 'Erreur dans la soumission d\'email' }));
  }
}
