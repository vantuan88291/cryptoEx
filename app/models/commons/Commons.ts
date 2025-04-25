import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const CommonsModel = types
  .model("Commons")
  .props({
    loading: false,
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setLoading: (load: boolean) => {
      self.loading = load
    },
  }))

export interface Commons extends Instance<typeof CommonsModel> {}
export interface CommonsSnapshotOut extends SnapshotOut<typeof CommonsModel> {}
export interface CommonsSnapshotIn extends SnapshotIn<typeof CommonsModel> {}
export const createCommonsDefaultModel = () => types.optional(CommonsModel, {})
