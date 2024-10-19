import templates from "@/templates/templates.json";
import templatesConverter from "@/templates/templates";

export async function GET(request, { params }) {
    const { id } = params;
    const template = templates[id];
    if (!template) {
        return Response.json({ message: "Template not found" });
    }
    return Response.json(templatesConverter(template));
}
