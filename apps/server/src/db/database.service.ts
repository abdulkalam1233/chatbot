import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as tables from "./schema/tables";

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private pool: Pool;
  public db: ReturnType<typeof drizzle>;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      connectionString: this.configService.get<string>("DATABASE_URL"),
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
    this.db = drizzle(this.pool, { schema: tables });
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
