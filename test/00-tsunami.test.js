import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

describe("Tsunami", () => {
    it("should not create Tsunami (Validation)", (done) => {
      chai
        .request(app)
        .post("/api/tsunamis")
        .send({
          region: "Test Region",
          date: "Not a valid date",
          size: 8.5,
          duration: 60.5,
          earthquake_id: 1,
        })
        .end((req, res) => {
          chai.expect(res.body.msg).to.be.equal("date should be a date");
          done();
        });
    });
  
    it("should create Tsunami", (done) => {
      chai
        .request(app)
        .post("/api/tsunamis")
        .send({
          region: "Test Region",
          date: "2024-05-09T12:00:00Z",
          size: 8.5,
          duration: 60.5,
          earthquake_id: 1,
        })
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(201);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.msg).to.be.equal("Tsunami successfully created");
          done();
        });
    });
  
    it("should get all Tsunamis", (done) => {
      chai
        .request(app)
        .get("/api/tsunamis")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.data).to.be.a("array");
          done();
        });
    });
  
    it("should get Tsunami by id", (done) => {
      chai
        .request(app)
        .get("/api/tsunamis/1")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.data).to.be.a("object");
          chai.expect(res.body.data.id).to.be.equal(1); 
          done();
        });
    });
  
    it("should not update Tsunami by id", (done) => {
      chai
        .request(app)
        .put("/api/tsunamis/3")
        .send({
          region: "Updated Region",
          date: "2024-05-09T12:00:00Z",
          size: 9.0,
          duration: 70.0,
          earthquake_id: 2,
        })
        .end((req, res) => {
          chai.expect(res.body.msg).to.be.equal("No tsunami with the id: 3 found");
          done();
        });
    });

    it("should not update Tsunami by id (Validation)", (done) => {
      chai
        .request(app)
        .put("/api/tsunamis/2")
        .send({
          region: "Updated Region",
          date: 14032004,
          size: 9.0,
          duration: 70.0,
          earthquake_id: 2,
        })
        .end((req, res) => {
          chai.expect(res.body.msg).to.be.equal("date should be a date");
          done();
        });
    });
  
    it("should delete Tsunami by id", (done) => {
      chai
        .request(app)
        .delete("/api/tsunamis/1")
        .end((req, res) => {
          chai.expect(res.status).to.be.equal(200);
          chai.expect(res.body).to.be.a("object");
          chai.expect(res.body.msg).to.be.equal("Tsunami with the id: 1 successfully deleted");
          done();
        });
    });
  });
  