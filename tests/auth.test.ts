import supertest from "supertest";
import app from "../src/app/index.js";
import prisma from "../src/config/database.js";

const EMAIL = `supertest@gmail.com`;
const PASSWORD = "PASSWORD123";
const CONFIRM_PASSWORD = "PASSWORD123";

const signUp = {
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: CONFIRM_PASSWORD
}

const signIn = {
    email: EMAIL,
    password: PASSWORD
}

beforeEach(async () => {
    await prisma.$executeRaw`DELETE FROM users WHERE email =  'supertest@gmail.com'`;
});

describe("User tests suite", () => {
    it("given email, password and confirmPassword, create user", async () => {
        const response = await supertest(app).post("/signup").send(signUp);
        expect(response.statusCode).toBe(201);

        const user = await prisma.user.findFirst({where: {email: EMAIL}});
        expect(user.email).toBe(EMAIL);
    });

    it("given email and password, receive token", async () => {
        const response = await supertest(app).post("/signin").send(signIn);
        const token = response.body.token;
        expect(token).not.toBeNull;
    });

    it("given email, password and confirmPassword already in use, fail to create user", async () => {
        const response = await supertest(app).post("/signup").send(signUp);
        expect(response.statusCode).toBe(201);
        const response2 = await supertest(app).post("/signup").send(signUp);
        expect(response2.statusCode).toBe(409);
    });
}); 

afterAll(async () => {
    await prisma.$disconnect();
})