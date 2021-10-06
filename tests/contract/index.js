const api = require('../../lib/api');
const path = require("path");
const {expect} = require("chai");
const {Pact} = require("@pact-foundation/pact");

describe('My API', () => {

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

  describe('GET /test', () => {

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
        state: "I can make a GET",
        uponReceiving: "a request for test information",
        withRequest: {
          method: "GET",
          path: "/test",
          headers: {
            Accept: "application/json",
          },
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
      api.example_get_1(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_BODY)
        done()
      }, done)
    })

  });

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
        state: "I can make a POST",
        uponReceiving: "a request for test information",
        withRequest: {
          method: "POST",
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
      api.example_post_1(urlAndPort).then(response => {
        expect(response.data).to.eql(EXPECTED_BODY)
        done()
      }, done)
    })

  });
});

