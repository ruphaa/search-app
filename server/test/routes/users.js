const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const server = require("../../app");

chai.use(chaiHttp);

describe('Check users routes', () => {
    it('testcase for base route', (done) => {
        chai.request(server)
        .get('/users/')
        .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
        });
    });  
});