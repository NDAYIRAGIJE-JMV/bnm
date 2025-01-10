/* import { sign } from 'jsonwebtoken';
import bcrypt from "bcryptjs/dist/bcrypt";
import executeQuery from '@/app/_utils/db';

export async function POST(request) {
    try {
        if (request.method == 'POST') {
            const secret = process.env.SECRET
            const data = await request.json();
            const email = data.email;
            const motdepasse = data.password
            const result = await executeQuery('SELECT * FROM users WHERE (email=?) ', (email))
            // Vérifier les informations d'identification de l'utilisateur
            if (result.length === 0) {
                return new Response(JSON.stringify({ message: 'Email introuvable' }));
            }
            const isMatch = await bcrypt.compare(motdepasse, result[0].passcode)
            if (isMatch) {
                const user = result[0];
                const token = sign(
                    {
                        exp: 60 * 60 * 24 * 1,// Expires in 1 day (seconds)
                        user: user.id,
                        email: user.email,
                        username: user.username,
                        name:user.name,
                        phone: user.phone,
                        role: user.role
                    },
                    secret
                );
                const cookieOptions = {
                    httpOnly: true, // Prevent JavaScript access
                    secure: process.env.NODE_ENV !== 'development', // Secure cookie (HTTPS only) in production
                    sameSite: 'strict', // Mitigate CSRF attacks
                    maxAge: 60 * 60 * 24, // Expires in 1 day (seconds)
                    path: '/',
                };
                const cookieString = `token=${token}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`;
                const response = new Response(JSON.stringify({ role: user.role, token, message: "Success" }));
                response.headers.set('Set-Cookie', cookieString);
                return response;
            }
            else {
                return new Response(JSON.stringify({ message: 'Mot de passe incorrect' }));
            }
        }
    }
    catch (error) {
        console.error('Try error', error)
        return new Response(JSON.stringify({ message: 'Erreur de validation' }));
    }
} */
import { auth, signIn } from "@/auth";

export async function POST(request) {
    "use server"
    let datas = await request.json();
    const referer = request.headers.get('referer');
    const userAgent = request.headers.get('User-Agent');
    const ip = request.headers.get('x-forwarded-for');
    datas.referer = referer
    datas.userAgent = userAgent
    datas.ip = ip
    try {
        await signIn("credentials", {
            redirect: false, // Prevent automatic redirect
            ...datas, // Spread the incoming data (e.g., phone, password)
            })
        let session = await auth();
        session.success = true
        return Response.json(session, {status:200});
    } catch (error) {
        return Response.json({error:error},{status:500})
    } 

}