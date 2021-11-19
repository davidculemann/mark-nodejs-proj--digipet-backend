import supertest from "supertest";
import { Digipet, setDigipet } from "../digipet/model";
import app from "../server";

/**
 * This file has integration tests for walking a digipet.
 *
 * It is intended to test two behaviours:
 *  1. walking a digipet leads to increasing happiness
 *  2. walking a digipet leads to decreasing nutrition
 *
 * These have been mostly separated out into two different E2E tests to try to make the tests more robust - it is possible that we might want a change in one but not the other, and it would be annoying to have to fix tests on increasing happiness when there's a change in intended nutrition behaviour.
 */

describe("When a user ignores a digipet repeatedly, its stats decrease by 10 until they settle at 0", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 25,
      nutrition: 40,
      discipline: 30,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toHaveProperty("happiness", 25);
    expect(response.body.digipet).toHaveProperty("nutrition", 40);
    expect(response.body.digipet).toHaveProperty("discipline", 30);
  });

  test("1st GET /digipet/ignore informs them about the walk and shows lowered stats", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 15);
    expect(response.body.digipet).toHaveProperty("nutrition", 30);
    expect(response.body.digipet).toHaveProperty("discipline", 20);
  });

  test("2nd GET /digipet/ignore shows continued stats change", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 5);
    expect(response.body.digipet).toHaveProperty("nutrition", 20);
    expect(response.body.digipet).toHaveProperty("discipline", 10);
  });

  test("3rd GET /digipet/ignore", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("nutrition", 10);
    expect(response.body.digipet).toHaveProperty("discipline", 0);
  });

  test("4th GET /digipet/ignore", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("nutrition", 0);
    expect(response.body.digipet).toHaveProperty("discipline", 0);
  });

  test("5th GET /digipet/ignore", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("nutrition", 0);
    expect(response.body.digipet).toHaveProperty("discipline", 0);
  });

});