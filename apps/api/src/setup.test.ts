import type { MockedFunction } from "vitest";
import { vi } from "vitest";
import { destroyServices, initializeServices } from "@app/setup";
import knex from "knex";

vi.resetModules();

vi.mock("knex", async () => {
  return {
    default: vi.fn(() => ({
      destroy: vi.fn(),
    })),
  };
});

const mockedKnex = knex as MockedFunction<typeof knex>;

describe("Setup", () => {
  beforeEach(async () => {
    await destroyServices();
    initializeServices.isInitialized = false;
    mockedKnex.mockClear();
  });

  it("initializes only once", async () => {
    await initializeServices({} as any);
    expect(mockedKnex).toBeCalledTimes(1);

    await initializeServices({} as any);
    expect(mockedKnex).toBeCalledTimes(1);
  });

  it("destroys only once", async () => {
    await destroyServices();
    expect(mockedKnex).toBeCalledTimes(0);

    await initializeServices({} as any);
    await destroyServices();
    expect(mockedKnex).toBeCalledTimes(1);

    await destroyServices();
    expect(mockedKnex).toBeCalledTimes(1);
  });
});
