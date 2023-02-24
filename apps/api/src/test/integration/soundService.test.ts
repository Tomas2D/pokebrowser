import { destroyTestApp, initTestApp, TestApp } from "@app/test/utils/app";

describe("Sounds", async () => {
  let app!: TestApp;

  beforeAll(async () => {
    app = await initTestApp();
  });

  afterAll(async () => {
    await destroyTestApp(app);
  });

  it("retrieves sound", async () => {
    const response = await app.app.inject({
      url: "/sound/1",
      method: "GET",
    });

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.headers).toBeDefined();
    expect(response.headers["content-type"]).toBe("audio/mpeg");
    expect(response.rawPayload).toBeInstanceOf(Buffer);
    expect(response.rawPayload.length).toBeGreaterThan(0);
  });

  it("throws error on non existing ID", async () => {
    const response = await app.app.inject({
      url: "/sound/999999999",
      method: "GET",
    });

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(404);
  });
});
