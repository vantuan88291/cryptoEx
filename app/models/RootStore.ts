import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { createCryptoDefaultModel } from "@/models/crypto/Crypto"
import { createCommonsDefaultModel } from "@/models/commons/Commons"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  crypto: createCryptoDefaultModel(),
  commons: createCommonsDefaultModel(),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
