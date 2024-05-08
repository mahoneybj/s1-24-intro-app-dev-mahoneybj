import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

describe("Earthquakes", () => {
  it("should not create earthquake", (done) => {
    chai
      .request(app)
      .post("/api/earthquakes")
      .send({
        date: "2024-05-09T12:00:00Z", // Example date
        magnitude: "7.5",
        depth: "10.5",
        duration: "60.5",
        intensity: 8,
        fault_line: "San Andreas Fault",
        after_shock_id: 0,
      })
      .end((req, res) => {
        chai.expect(res.body.msg).to.be.equal("Magnitude should be a decimal");
        done();
      });
  });

  it("should create earthquake", (done) => {
    chai
      .request(app)
      .post("/api/earthquakes")
      .send({
        date: "2024-05-09T12:00:00Z", // Example date
        magnitude: 7.5,
        depth: 10.5,
        duration: 60.5,
        intensity: 8,
        fault_line: "San Andreas Fault",
        after_shock_id: 0,
      })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Earthquake successfully created");
        done();
      });
  });

  it("should get all earthquakes", (done) => {
    chai
      .request(app)
      .get("/api/earthquakes")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should get earthquake by id", (done) => {
    chai
      .request(app)
      .get("/api/earthquakes/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        chai.expect(res.body.data.id).to.be.equal(1); 
        done();
      });
  });

  it("should not update earthquake by id", (done) => {
    chai
      .request(app)
      .put("/api/earthquakes/1")
      .send({
        magnitude: "8.0",
        depth: "15.0",
        duration: "70.0",
        intensity: 9,
        fault_line: "San Andreas Fault",
        after_shock_id: 0,
      })
      .end((req, res) => {
        chai.expect(res.body.msg).to.be.equal("Earthquake with id: 1 not found");
        done();
      });
  });

  it("should delete earthquake by id", (done) => {
    chai
      .request(app)
      .delete("/api/earthquakes/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Earthquake with the id: 1 successfully deleted");
        done();
      });
  });
});
