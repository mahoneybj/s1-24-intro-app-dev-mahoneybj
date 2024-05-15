import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

describe("EEWInfo", () => {
    it("should not create EEWInfo (validation)", (done) => {
      chai
        .request(app)
        .post("/api/eewinfo")
        .send({
          alert_triggered: "Not a boolean",
          date: "2024-05-09T12:00:00Z",
          region: "Test Region",
          duration: 250.75,
          accuracy: 101.5,
          earthquake_id: 1,
        })
        .end((req, res) => {
          chai.expect(res.body.msg).to.be.equal("Alert triggered should be a boolean");
          done();
        });
    });
  
    it("should create EEWInfo", (done) => {
      chai
        .request(app)
        .post("/api/eewinfo")
        .send({
          alert_triggered: true,
          date: "2024-05-09T12:00:00Z",
          region: "Otago",
          duration: 250.75,
          accuracy: 99.5,
          earthquake_id: 1,
        })
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(201);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.msg).to.be.equal("EEW info successfully created");
          done();
        });
    });
  
    it("should get all EEWInfo", (done) => {
      chai
        .request(app)
        .get("/api/eewinfo")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.data).to.be.a("array");
          done();
        });
    });
  
    it("should get EEWInfo by id", (done) => {
      chai
        .request(app)
        .get("/api/eewinfo/1")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.data).to.be.a("object");
          chai.expect(res.body.data.id).to.be.equal(1); 
          done();
        });
    });
  
    it("should not update EEWInfo by id", (done) => {
      chai
        .request(app)
        .put("/api/eewinfo/3")
        .send({
          alert_triggered: false,
          date: "2024-05-09T12:00:00Z",
          region: "Updated Region",
          duration: 300,
          accuracy: 98.7,
          earthquake_id: 2,
        })
        .end((req, res) => {
          chai.expect(res.body.msg).to.be.equal("No EEW info with the id: 3 found");
          done();
        });
    });

    it("should not update EEWInfo by id (validation)", (done) => {
      chai
        .request(app)
        .put("/api/eewinfo/2")
        .send({
          alert_triggered: false,
          date: "2024-05-09T12:00:00Z",
          region: "",
          duration: 300.5,
          accuracy: 98.7,
          earthquake_id: 2
        })
        .end((req, res) => {
          console.log(res)
          chai.expect(res.body.msg).to.be.equal("Region cannot be empty");
          done();
        });
    });
  
    it("should delete EEWInfo by id", (done) => {
      chai
        .request(app)
        .delete("/api/eewinfo/1")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.msg).to.be.equal("EEW info with the id: 1 successfully deleted");
          done();
        });
    });
  });
  