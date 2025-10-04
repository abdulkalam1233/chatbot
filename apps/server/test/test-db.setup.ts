import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { Wait } from "testcontainers";
import * as tables from "../src/db/schema/tables";

let container: StartedPostgreSqlContainer;
let testDb: ReturnType<typeof drizzle>;
let pool: Pool;

const TEST_CONTAINER_NAME = "chatbot-test-db";

export async function setupTestDatabase() {
  console.log(`Creating PostgreSQL container with name: ${TEST_CONTAINER_NAME}...`);
  container = await new PostgreSqlContainer("postgres:15-alpine")
    .withDatabase("test_chatbot")
    .withUsername("test_user")
    .withPassword("test_password")
    .withExposedPorts(5432)
    .withWaitStrategy(Wait.forLogMessage("database system is ready to accept connections", 2))
    .withStartupTimeout(120000)
    .withName(TEST_CONTAINER_NAME)
    .start();

  console.log("Container started successfully!");
  process.env.DATABASE_URL = container.getConnectionUri();
  console.log("DATABASE_URL:", process.env.DATABASE_URL);

  pool = new Pool({
    connectionString: container.getConnectionUri(),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

  console.log("Creating Drizzle instance...");
  testDb = drizzle(pool, { schema: tables });

  console.log("Testing database connection...");
  try {
    await pool.query("SELECT 1");
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }

  console.log("Running migrations...");
  try {
    await migrate(testDb, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }

  return {
    container,
    db: testDb,
    pool,
    connectionString: container.getConnectionUri(),
  };
}

export async function teardownTestDatabase() {
  if (testDb) {
    await testDb.$client.end();
  } else if (pool) {
    // Only end pool if we didn't end it through testDb.$client
    await pool.end();
  }
  if (container) {
    console.log(`Stopping container: ${TEST_CONTAINER_NAME}...`);
    await container.stop();
    console.log(`Container ${TEST_CONTAINER_NAME} stopped successfully`);
    // Note: testcontainers automatically removes containers when they stop
    // The container will be cleaned up automatically
  }
}

beforeAll(async () => {
  console.log("Setting up test database...");
  await setupTestDatabase();
});

afterAll(async () => {
  console.log("Tearing down test database...");
  await teardownTestDatabase();
});

// Ensure cleanup on process exit
process.on("exit", teardownTestDatabase);
process.on("SIGINT", async () => {
  await teardownTestDatabase();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await teardownTestDatabase();
  process.exit(0);
});
