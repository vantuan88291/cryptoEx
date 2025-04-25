import { CryptoModel } from "./Crypto"
import { getRootStore } from "@/models"
import { api } from "@/services/api"

// Mock API
jest.mock("@/services/api", () => ({
  api: {
    getCrypto: jest.fn(),
    getFiat: jest.fn(),
  },
}))

// Mock getRootStore
jest.mock("@/models", () => ({
  getRootStore: jest.fn(),
}))

const mockSetLoading = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  ;(getRootStore as jest.Mock).mockReturnValue({
    commons: {
      setLoading: mockSetLoading,
    },
  })
})

const cryptoData = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC", code: undefined },
  { id: "ETH", name: "Ethereum", symbol: "ETH", code: undefined },
]
const fiatData = [
  { id: "USD", name: "US Dollar", symbol: "USD", code: "USD" },
  { id: "EUR", name: "Euro", symbol: "EUR", code: "EUR" },
]

describe("CryptoModel", () => {
  it("insertData: should fetch and merge data correctly", async () => {
    ;(api.getCrypto as jest.Mock).mockResolvedValue(cryptoData)
    ;(api.getFiat as jest.Mock).mockResolvedValue(fiatData)

    const model = CryptoModel.create({})
    await model.insertData()

    expect(mockSetLoading).toHaveBeenCalledWith(true)
    expect(mockSetLoading).toHaveBeenCalledWith(false)
    expect(model.data.length).toBe(4)
  })

  it("insertData: should still stop loading if API fails", async () => {
    ;(api.getCrypto as jest.Mock).mockRejectedValue(new Error("API Error"))

    const model = CryptoModel.create({})
    await model.insertData()

    expect(mockSetLoading).toHaveBeenCalledWith(true)
    expect(mockSetLoading).toHaveBeenCalledWith(false)
    expect(model.data.length).toBe(0)
  })

  it("clearData: should empty data", () => {
    const model = CryptoModel.create({
      data: [...cryptoData, ...fiatData],
    })
    model.clearData()

    expect(model.data.length).toBe(0)
  })

  it("assets: should filter by fiat", () => {
    const model = CryptoModel.create({
      data: [...cryptoData, ...fiatData],
      typeAsset: "fiat",
    })
    expect(model.assets.length).toBe(2)
    expect(model.assets.every((item) => item.code)).toBe(true)
  })

  it("assets: should filter by crypto", () => {
    const model = CryptoModel.create({
      data: [...cryptoData, ...fiatData],
      typeAsset: "crypto",
    })
    expect(model.assets.length).toBe(2)
    expect(model.assets.every((item) => !item.code)).toBe(true)
  })

  it("assets: should return all if typeAsset is null", () => {
    const model = CryptoModel.create({
      data: [...cryptoData, ...fiatData],
      typeAsset: null,
    })
    expect(model.assets.length).toBe(4)
  })

  it("assetsSearch: should return results with score 0 or 1 sorted", () => {
    const model = CryptoModel.create({
      data: [...cryptoData, ...fiatData],
      keyword: "usd",
    })
    const result = model.assetsSearch
    expect(result.length).toBe(1)
    expect(result[0].symbol).toBe("USD")
  })

  it("assetsSearch: should return full data if no keyword", () => {
    const model = CryptoModel.create({
      data: [...cryptoData, ...fiatData],
    })
    const result = model.assetsSearch
    expect(result.length).toBe(4)
  })

  it("setTypeAsset & setKeyword: should update props", () => {
    const model = CryptoModel.create({})
    model.setTypeAsset("fiat")
    model.setKeyword("btc")

    expect(model.typeAsset).toBe("fiat")
    expect(model.keyword).toBe("btc")
  })
})
