import { NextRequest } from "next/server";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Next.js API Docs",
      version: "1.0.0",
      description: "Auto-generated Swagger API documentation for Next.js",
    },
    servers: [{ url: "http://localhost:3000" },{ url: "https://nextecomapipre.pigeonic.com"},{ url: "https://nextecomapi.pigeonic.com"}], // Update this in production
  },
  apis: ["./app/api/**/*.ts"], // Ensure this path is correct
};

const swaggerSpec = swaggerJSDoc(options);

// Export the GET function for Next.js App Router
export async function GET(req: NextRequest) {
  return new Response(JSON.stringify(swaggerSpec), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
