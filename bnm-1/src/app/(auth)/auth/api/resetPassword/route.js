import executeQuery from '@/app/_utils/db';
import bcrypt from 'bcryptjs/dist/bcrypt';

export async function PUT(request) {
    if (request.method === 'PUT') {
        const data = await request.json()
        console.log("object", data)
        const mail = data.mail
        const password = data.password
        const saltrounds = 10
        const salt = await bcrypt.genSalt(saltrounds)
        const hashedPassword = await bcrypt.hash(password, salt)
        const resul = await executeQuery(`UPDATE users SET passcode=? WHERE users.email =?`, [hashedPassword, mail])
        console.log("objec", resul)
        if (resul.changedRows == 1) {
            return new Response(JSON.stringify({ message: 'Changement de mot de passe réussi', res: 'updated' }));
        }
        else if (!mail) {
            return new Response(JSON.stringify({ message: 'Changement de mot de passe échoué, Cliquez d\'abord sur le lien envoyé dans ton mail pour réessayer', res: 'notUpdated' }));
        }
        else {
            console.log('res', resul.changedRows);
            return new Response(JSON.stringify({ message: 'Mot de passe non modifié', res: 'notUpdated' }));
        }
    }


}