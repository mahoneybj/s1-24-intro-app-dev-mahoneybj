/**
 * @file This file contains Mocha and Chai tests for the building damage related API endpoints.
 * @author Ben Mahoney
 */

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

describe("Building Damage", () => {
  it("should not create building damage (Validation)", (done) => {
    chai
      .request(app)
      .post("/api/buildings")
      .send({
        houses_damaged: "Not a number",
        houses_destroyed: 5,
        commerical_damaged: 10,
        commerical_destroyed: 2,
        earthquake_id: 1,
        cost: 50000,
      })
      .end((req, res) => {
        chai.expect(res.body.msg).to.be.equal("houses damaged should be a int");
        done();
      });
  });

  it("should create building damage", (done) => {
    chai
      .request(app)
      .post("/api/buildings")
      .send({
        houses_damaged: 10,
        houses_destroyed: 5,
        commerical_damaged: 10,
        commerical_destroyed: 2,
        earthquake_id: 1,
        cost: 50000,
      })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Building damage log successfully created");
        done();
      });
  });

  it("should get all building damages", (done) => {
    chai
      .request(app)
      .get("/api/buildings")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should get building damage by id", (done) => {
    chai
      .request(app)
      .get("/api/buildings/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        chai.expect(res.body.data.id).to.be.equal(1);
        done();
      });
  });

  it("should not update building damage by id", (done) => {
    chai
      .request(app)
      .put("/api/buildings/3")
      .send({
        houses_damaged: 20,
        houses_destroyed: 10,
        commerical_damaged: 5,
        commerical_destroyed: 1,
        earthquake_id: 2,
        cost: 75000,
      })
      .end((req, res) => {
        chai
          .expect(res.body.msg)
          .to.be.equal("No building damage logs with the id: 3 found");
        done();
      });
  });

  it("should not update building damage by id (Validation)", (done) => {
    chai
      .request(app)
      .put("/api/buildings/2")
      .send({
        houses_damaged: "Not an int",
        houses_destroyed: 10,
        commerical_damaged: 5,
        commerical_destroyed: 1,
        earthquake_id: 2,
        cost: 75000,
      })
      .end((req, res) => {
        chai.expect(res.body.msg).to.be.equal("houses damaged should be a int");
        done();
      });
  });

  it("should delete building damage by id", (done) => {
    chai
      .request(app)
      .delete("/api/buildings/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal(
            "Building damage log with the id: 1 successfully deleted"
          );
        done();
      });
  });
});
