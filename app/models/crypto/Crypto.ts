import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"
import { DataAsset, typeAsset } from "@/models/crypto/Crypto.props"
import Toast from "react-native-toast-message"
import { api } from "@/services/api"
import { getRootStore } from "@/models"

/**
 * Model description here for TypeScript hints.
 */
const calculateScore = (keyword = "", market = "", marketLong = "") => {
  let scoreValue = market.toLowerCase().indexOf(keyword.toLowerCase())
  if (scoreValue !== 0) {
    scoreValue = marketLong.toLowerCase().indexOf(keyword.toLowerCase())
    if (scoreValue !== 0) {
      const scoreLongName = marketLong
        .split(" ")
        .map((item) => item.toLowerCase())
        .indexOf(keyword.toLowerCase())
      if (scoreLongName > -1) {
        scoreValue = 1
      } else {
        scoreValue = -1
      }
    }
  }
  return scoreValue
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
        return self.data
          .map((item) => ({
            ...item,
            score: calculateScore(self.keyword || "", item.symbol || "", item.name || ""),
          }))
          .filter((item) => item.score === 0 || item.score === 1)
          .sort(function (a, b) {
            return a.score - b.score
          })
      }
      return self.data
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    insertData: async () => {
      getRootStore(self).commons.setLoading(true)
      try {
        const [crypto, fiat] = await Promise.all([api.getCrypto(), api.getFiat()])
        self.setProp("data", [...crypto, ...fiat])
        Toast.show({
          type: "success",
          text1: "Data Loaded",
          text2: "Data has been loaded!",
        })
      } catch (e: any) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: e.toString(),
        })
      } finally {
        getRootStore(self).commons.setLoading(false)
      }
    },
    clearData: () => {
      self.data.clear()
      Toast.show({
        type: "success",
        text1: "Clear success",
        text2: "Data has been removed!",
      })
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
