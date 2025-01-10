// app/associe/api/unreadcount/route.js
import executeQuery from "@/app/_utils/db";

export async function GET() {
  try {
    const query = `SELECT COUNT(*) as unreadCount FROM demande_conge WHERE status = 0`;
    const results = await executeQuery(query);
    return new Response(
      JSON.stringify({
        message: "Success",
        unreadCount: results[0].unreadCount
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error",
        error: error.message
      }),
      { status: 500 }
    );
  }
}
