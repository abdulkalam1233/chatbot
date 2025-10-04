import type { INestApplication } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import request from "supertest";
import { AppModule } from "@/app.module";
import { DatabaseService } from "@/db/database.service";
import { TestDatabase } from "./test-utils";

describe("ConversationsController (e2e)", () => {
  let app: INestApplication;
  let testDatabase: TestDatabase;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    const datbaseService = moduleFixture.get<DatabaseService>(DatabaseService);
    testDatabase = new TestDatabase(datbaseService.db);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await testDatabase.clearDatabase();
  });

  it("/conversations (GET) - should return empty array initially", () => {
    return request(app.getHttpServer()).get("/conversations").expect(200).expect([]);
  });

  it("/conversations (GET) - should return conversations after creating them", async () => {
    // Create test conversations
    await testDatabase.createConversation({ title: "Test Conversation 1" });
    await testDatabase.createConversation({ title: "Test Conversation 2" });

    const response = await request(app.getHttpServer()).get("/conversations").expect(200);

    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toHaveProperty("title", "Test Conversation 1");
    expect(response.body[1]).toHaveProperty("title", "Test Conversation 2");
  });

  it("/conversations (POST) - should create a new conversation", async () => {
    const response = await request(app.getHttpServer())
      .post("/conversations")
      .send({ title: "Test Conversation 3" })
      .expect(201);
    expect(response.body).toHaveProperty("title", "Test Conversation 3");
  });

  it("/conversations (POST) - should return 400 if the title is not provided", async () => {
    const response = await request(app.getHttpServer()).post("/conversations").send({}).expect(400);
    expect(response.body).toHaveProperty("message", "title is required");
  });
});
