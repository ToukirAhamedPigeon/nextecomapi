// swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

// Swagger options for configuration
const options = {
  definition: {
    openapi: "3.0.0",  // OpenAPI version
    info: {
      title: "Next.js API Docs",  // API Title
      version: "1.0.0",  // Version
      description: "Auto-generated Swagger API documentation for Next.js",  // Description
    },
    servers: [
      { url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api" },  // Server URL
    ],
  },
  apis: ["./app/api/**/*.ts"],  // Path to your API route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Export GET function for Next.js App Router
export async function GET() {
  return new Response(JSON.stringify(swaggerSpec), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
