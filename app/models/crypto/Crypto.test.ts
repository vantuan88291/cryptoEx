import { CryptoModel } from "./Crypto"

test("can be created", () => {
  const instance = CryptoModel.create({})

  expect(instance).toBeTruthy()
})
