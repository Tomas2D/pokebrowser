import { destroyTestApp, initTestApp, TestApp } from "@app/test/utils/app";

describe("Home", async () => {
  let app!: TestApp;

  beforeAll(async () => {
    app = await initTestApp();
  });

  afterAll(async () => {
    await destroyTestApp(app);
  });

  it("retrieves hello message", async () => {
    const response = await app.app.inject({
      url: "/",
      method: "GET",
    });

    expect(response).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.headers).toBeDefined();
    expect(response.headers["content-type"]).toBe(
      "application/json; charset=utf-8"
    );
    expect(response.payload).toEqual(`{"message":"Hello!"}`);
  });
});
