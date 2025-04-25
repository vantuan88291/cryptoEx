import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { DataAsset, typeAsset } from "@/models/crypto/Crypto.props"
import { cryptos, fiats } from "@/models/crypto/data"

/**
 * Model description here for TypeScript hints.
 */
const calculateScore = (keyword = "", market = "", marketLong = "") => {
  let marketName = market
  let scoreValue = market.toLowerCase().indexOf(keyword.toLowerCase())
  if (scoreValue < 0) {
    scoreValue = marketLong.toLowerCase().indexOf(keyword.toLowerCase())
    marketName = marketLong
  }
  let score = scoreValue >= 0 ? scoreValue : 999
  if (keyword?.length === marketName?.length) {
    score = score - 1
  }
  return score
}
export const CryptoModel = types
  .model("Crypto")
  .props({
    data: types.optional(types.array(DataAsset), []),
    typeAsset: types.maybeNull(types.string),
    keyword: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get assets() {
      if (self.typeAsset) {
        return self.data.filter((item) => (self.typeAsset === "fiat" ? !!item?.code : !item?.code))
      }
      return self.data
    },
    get assetsSearch() {
      if (self.keyword) {
        return self.data.filter((item) => item.code)
      }
      return self.data
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    insertData: () => {
      self.setProp("data", [...cryptos, ...fiats])
    },
    clearData: () => {
      self.data.clear()
    },
    setTypeAsset: (typeAsset?: typeAsset) => {
      self.typeAsset = typeAsset || null
    },
    setKeyword: (keyword: string) => {
      self.keyword = keyword
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Crypto extends Instance<typeof CryptoModel> {}
export interface CryptoSnapshotOut extends SnapshotOut<typeof CryptoModel> {}
export interface CryptoSnapshotIn extends SnapshotIn<typeof CryptoModel> {}
export const createCryptoDefaultModel = () => types.optional(CryptoModel, {})
