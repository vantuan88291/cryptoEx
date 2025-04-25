import { Instance, types } from "mobx-state-tree"

export const DataAsset = types.model({
  id: types.maybeNull(types.string),
  name: types.maybeNull(types.string),
  symbol: types.maybeNull(types.string),
  code: types.maybeNull(types.string),
})

type DataProfileType = Instance<typeof DataAsset>
export interface DatAssetProps extends DataProfileType {}

export type typeAsset = "crypto" | "fiat"
