import templates from "@/templates/templates.json";

export async function GET(request) {
    console.log("GET /api/templates");

    return Response.json({ templates });
}
