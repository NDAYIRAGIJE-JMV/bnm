// app/associe/api/readnotification/[notificationId]/route.js

import executeQuery from "@/app/_utils/db";

export async function POST(req, { params }) {
  const { id } = params;
  console.log('id:',id)
  try {
    const query = `UPDATE demande_conge SET status = ? WHERE id = ?`;
    const result = await executeQuery(`UPDATE demande_conge SET status = ? WHERE id = ?`, [1,id]);
    console.log('result:',result)
    return new Response(
      JSON.stringify({ message: "Notification marked as read" }),
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
