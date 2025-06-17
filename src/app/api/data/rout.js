import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const data = await db.collection("mycollection").find({}).toArray();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("mydatabase");
    const result = await db.collection("mycollection").insertOne(body);

    return new Response(JSON.stringify(result), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
