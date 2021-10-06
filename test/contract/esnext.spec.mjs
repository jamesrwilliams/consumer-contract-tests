import path from "path";
import { another_exported_function } from "../../lib/es6-file.mjs";
import {expect} from "chai";
import {Pact} from "@pact-foundation/pact";

describe('My API (esnext)', () => {

  let url = 'http://localhost';
  const port = 8992;

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), "tests", "contract", "logs", "mockserver-integration.log"),
    dir: path.resolve(process.cwd(), "tests", "contract", "pacts"),
    spec: 2,
    consumer: "MyConsumer",
    provider: "MyProvider",
    pactfileWriteMode: "merge",
  });


  before(() => provider.setup())

  after(() => provider.finalize())

  afterEach(() => provider.verify())

  describe('POST /test', () => {

    const EXPECTED_BODY = [
      {
        foo: 1,
      },
      {
        bar: 2,
      },
    ]

    // Register this tests interactions with pact
    before(done => {
      const interaction = {
        state: "I can make a POST to an MJS file",
        uponReceiving: "a request for test information",
        withRequest: {
          method: "GET",
          path: "/test",
          headers: {
            Accept: "application/json",
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: EXPECTED_BODY,
        },
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })

    // Assert on the mocked response
    it("returns the correct response", done => {
      const urlAndPort = {
        url: url,
        port: port,
      }
      another_exported_function(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_BODY)
        done()
      }, done)
    })

  });
});
