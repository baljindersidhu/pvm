/**
 * 
 */

var should   = require("should");
const CommandRunnerProvider = require("../utils/command-runner");

describe("CommandRunner", () => {

    it("should initialize", () => {
        should.exist(new CommandRunnerProvider());
    });

    it("should have execute method", () => {
        let command_runner = new CommandRunnerProvider();
        command_runner.should.have.property("execute");
        command_runner.execute.should.be.a.Function();
    });

    it("should execute ECHO Hello World", async() => {
        let command_runner = new CommandRunnerProvider();
        let msg = await command_runner.execute("ECHO \"Hello World\"");
        should(msg).be.a.String().and.equal("\"Hello World\"\r\n");
    });
})