import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

describe("Fake root", () => {
    it("should not get anything (Fake root)", (done) => {
        chai
          .request(app)
          .get("/api/fake")
          .end((req, res) => {
            chai.expect(res.status).to.be.equal(404);
            done();
          });
      });
    });