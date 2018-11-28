import logger from "./logger";
import chai from "chai";

const expect = chai.expect;

describe("logger", () => {
    it("logs", () => {
        logger.error("Asdf");
        expect(true).to.equal(true);
    });

});
