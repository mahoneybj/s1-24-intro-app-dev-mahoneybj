import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

describe("SensorInfo", () => {
    it("should not create SensorInfo", (done) => {
      chai
        .request(app)
        .post("/api/sensorinfo")
        .send({
          location: "Test Location",
          region: "Test Region",
          sensor_type: "Test Sensor",
          activate: "Not a boolean",
        })
        .end((req, res) => {
          chai.expect(res.body.msg).to.be.equal("Active status should be a boolean");
          done();
        });
    });
  
    it("should create SensorInfo", (done) => {
      chai
        .request(app)
        .post("/api/sensorinfo")
        .send({
          location: "Test Location",
          region: "Test Region",
          sensor_type: "Test Sensor",
          activate: true,
        })
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(201);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.msg).to.be.equal("Sensor Info successfully created");
          done();
        });
    });
  
    it("should get all SensorInfo", (done) => {
      chai
        .request(app)
        .get("/api/sensorinfo")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.data).to.be.a("array");
          done();
        });
    });
  
    it("should get SensorInfo by id", (done) => {
      chai
        .request(app)
        .get("/api/sensorinfo/1")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.data).to.be.a("object");
          chai.expect(res.body.data.id).to.be.equal(1); 
          done();
        });
    });
  
    it("should not update SensorInfo by id", (done) => {
      chai
        .request(app)
        .put("/api/sensorinfo/3")
        .send({
          location: "Updated Location",
          region: "Updated Region",
          sensor_type: "Updated Sensor",
          activate: false,
        })
        .end((req, res) => {
          chai.expect(res.body.msg).to.be.equal("No sensorinfo with the id: 3 found");
          done();
        });
    });
  
    it("should delete SensorInfo by id", (done) => {
      chai
        .request(app)
        .delete("/api/sensorinfo/1")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.msg).to.be.equal("Sensor Info with the id: 1 successfully deleted");
          done();
        });
    });
  });
  