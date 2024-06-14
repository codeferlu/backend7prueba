const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("GET /cafes - Debería devolver un status code 200 y un arreglo con al menos un objeto", async () => {
        const response = await request(server).get("/cafes");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("DELETE /cafes/:id - Debería devolver un status code 404 si el id no existe", async () => {
        const response = await request(server)
            .delete("/cafes/9999")
            .set("Authorization", "Bearer token");
        expect(response.status).toBe(404);
    });

    it("POST /cafes - Debería agregar un nuevo café y devolver un status code 201", async () => {
        const nuevoCafe = { id: 5, nombre: "Latte" };
        const response = await request(server)
            .post("/cafes")
            .send(nuevoCafe);
        expect(response.status).toBe(201);
        expect(response.body.some(cafe => cafe.id === nuevoCafe.id)).toBe(true);
    });

    it("PUT /cafes/:id - Debería devolver un status code 400 si los IDs no coinciden", async () => {
        const cafeActualizado = { id: 6, nombre: "Espresso" };
        const response = await request(server)
            .put("/cafes/1")
            .send(cafeActualizado);
        expect(response.status).toBe(400);
    });
});
