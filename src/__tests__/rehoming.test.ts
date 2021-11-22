import supertest from "supertest";
import { INITIAL_DIGIPET, setDigipet } from "../digipet/model";
import app from "../server";

describe("User can rehome a digipet if they have one", () => {
  // setup: ensure there is no digipet to begin with
  setDigipet(INITIAL_DIGIPET);

  test("1st GET /digipet informs them that they have hatched a digipet and includes initial digipet data", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/waiting/i);
    expect(response.body.message).toMatch(/digipet/i);
    expect(response.body.digipet).toHaveProperty(
      "happiness",
      INITIAL_DIGIPET.happiness
    );
    expect(response.body.digipet).toHaveProperty(
      "nutrition",
      INITIAL_DIGIPET.nutrition
    );
    expect(response.body.digipet).toHaveProperty(
      "discipline",
      INITIAL_DIGIPET.discipline
    );
  });

  test("2nd GET /digipet after rehoming now informs them that they don't currently have a digipet", async () => {
    await supertest(app).get("/digipet/rehome");
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/don't have/i);
    expect(response.body.digipet).not.toBeDefined();
  });

  test("GET /digipet/rehome now informs them that they can't rehome a digipet if thet dont have one", async () => {
    const response = await supertest(app).get("/digipet/rehome");
    expect(response.body.message).not.toMatch(/success/i);
    expect(response.body.message).toMatch(/can't rehome/i);
  });

  test("Hatching after rehoming informs them that they have hatched a digipet and includes initial digipet data", async () => {
    const response = await supertest(app).get("/digipet/hatch");
    expect(response.body.message).toMatch(/success/i);
    expect(response.body.message).toMatch(/hatch/i);
    expect(response.body.digipet).toHaveProperty(
      "happiness",
      INITIAL_DIGIPET.happiness
    );
    expect(response.body.digipet).toHaveProperty(
      "nutrition",
      INITIAL_DIGIPET.nutrition
    );
    expect(response.body.digipet).toHaveProperty(
      "discipline",
      INITIAL_DIGIPET.discipline
    );
  });

});
