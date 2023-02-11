const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it.each`
    input
    ${"test input"}
    ${22}
  `(
    "Return partitionKey when provided as an attribute in input ($input)",
    ({ input }) => {
      const trivialKey = deterministicPartitionKey({ partitionKey: input });
      expect(trivialKey).toEqual(`${input}`);
    }
  );

  it.each`
    input
    ${"test input"}
    ${{ test: "test input" }}
    ${22}
  `(
    "Return hash when partitionKey attribute is not found in input ($input)",
    ({ input }) => {
      const trivialKey = deterministicPartitionKey(input);
      expect(trivialKey).toEqual(
        crypto
          .createHash("sha3-512")
          .update(JSON.stringify(input))
          .digest("hex")
      );
    }
  );

  it("Returns hash when input length is greater than 256", () => {
    const input =
      "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttets";
    const trivialKey = deterministicPartitionKey({ partitionKey: input });
    expect(trivialKey).toEqual(
      crypto.createHash("sha3-512").update(input).digest("hex")
    );
  });
});
