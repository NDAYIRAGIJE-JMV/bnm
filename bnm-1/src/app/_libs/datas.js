import executeQuery from "@/app/_utils/db";

export async function getTribunals() {
    try {
        const result = await executeQuery('SELECT * FROM tribunal', [])
        return result
    }
    catch (error) {
        return []
    }
}

export function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}