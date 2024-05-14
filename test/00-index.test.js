import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

describe("Index", () => {
    it("should get all endpoints", (done) => {
        chai
          .request(app)
          .get("/")
          .end((req, res) => {
            chai.expect(res.status).to.be.equal(200);
            chai.expect(res.body).to.be.a("object");
            chai.expect(res.body.data).to.be.a("array");
            done();
          });
      });
});