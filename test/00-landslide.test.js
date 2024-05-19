/**
 * @file This file contains Mocha and Chai tests for the landslides related API endpoints.
 * @author Ben Mahoney
 */

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

describe("Landslide", () => {
  it("should not create Landslide (Validation)", (done) => {
    chai
      .request(app)
      .post("/api/landslides")
      .send({
        smallest: 10,
        largest: 20,
        region: "Test Region",
        number: "Not a number",
        earthquake_id: 1,
      })
      .end((req, res) => {
        chai
          .expect(res.body.msg)
          .to.be.equal("Number of landslides should be a int");
        done();
      });
  });

  it("should create Landslide", (done) => {
    chai
      .request(app)
      .post("/api/landslides")
      .send({
        smallest: 10.5,
        largest: 20.5,
        region: "Test Region",
        number: 5,
        earthquake_id: 1,
      })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("Landslide successfully created");
        done();
      });
  });

  it("should get all Landslide", (done) => {
    chai
      .request(app)
      .get("/api/landslides")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should get Landslide by id", (done) => {
    chai
      .request(app)
      .get("/api/landslides/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        chai.expect(res.body.data.id).to.be.equal(1);
        done();
      });
  });

  it("should not update Landslide by id", (done) => {
    chai
      .request(app)
      .put("/api/landslides/3")
      .send({
        smallest: 11.5,
        largest: 21.5,
        region: "Updated Region",
        number: 8,
        earthquake_id: 2,
      })
      .end((req, res) => {
        chai
          .expect(res.body.msg)
          .to.be.equal("No landslide with the id: 3 found");
        done();
      });
  });

  it("should not update Landslide by id (Validation)", (done) => {
    chai
      .request(app)
      .put("/api/landslides/2")
      .send({
        smallest: 11.5,
        largest: "Not an int",
        region: "Updated Region",
        number: 8,
        earthquake_id: 2,
      })
      .end((req, res) => {
        chai
          .expect(res.body.msg)
          .to.be.equal("Largest landslide should be a decimal");
        done();
      });
  });

  it("should delete Landslide by id", (done) => {
    chai
      .request(app)
      .delete("/api/landslides/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Landslide with the id: 1 successfully deleted");
        done();
      });
  });
});
