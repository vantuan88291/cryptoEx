import { CommonsModel } from "./Commons"

test("can be created", () => {
  const instance = CommonsModel.create({})

  expect(instance).toBeTruthy()
})
