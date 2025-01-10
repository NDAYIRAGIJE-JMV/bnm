import { cookies } from 'next/headers'
export async function POST(request) {
    try {
        if (request.method == 'POST') {
            const response = new Response(JSON.stringify({ message: "Success" }));
            cookies().delete('token')
            return response;

        }
    }
    catch (error) {
        console.error('Try error', error)
        return new Response(JSON.stringify({ message: 'validation error' }));
    }
}
