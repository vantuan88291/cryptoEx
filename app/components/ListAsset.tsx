import { TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useAppTheme } from "@/utils/useAppTheme"
import type { ThemedStyle } from "@/theme"
import { Text } from "@/components/Text"
import { ListView } from "@/components/ListView"
import { Icon } from "@/components/Icon"
import { DatAssetProps } from "@/models/crypto/Crypto.props"
import { ListRenderItem } from "@shopify/flash-list"
/**
 * Describe your component here
 */
interface Props {
  data: DatAssetProps[]
  isSearching?: boolean
}
export const ListAsset = observer(function ListAsset(props: Props) {
  const { themed } = useAppTheme()

  const renderItem: ListRenderItem<DatAssetProps> = ({ item }) => {
    return (
      <View style={$container}>
        <View style={themed($logoCoin)}>
          <Text style={themed($textLogo)} text={(item.name || "").charAt(1)} />
        </View>
        <Text style={$flex} text={item.name || ""} />
        <View style={$wrap}>
          <Text text={item.symbol || ""} />
          <Icon icon={"caretRight"} size={17} />
        </View>
      </View>
    )
  }
  return (
    <ListView
      data={props.data}
      ListEmptyComponent={
        <View style={$empty}>
          <Icon icon={"empty"} size={50} />
          {!!props.isSearching && (
            <View>
              <Text preset={"formLabel"} tx={"list:empty"} />
              <Text tx={"list:tryAnother"} />
            </View>
          )}
        </View>
      }
      renderItem={renderItem}
      estimatedItemSize={40}
    />
  )
})

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 4,
  padding: 10,
}
const $flex: ViewStyle = {
  flex: 1,
}
const $wrap: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  gap: 7,
}

const $empty: ViewStyle = {
  alignItems: "center",
  marginTop: 10,
}
const $textLogo: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.neutral100,
})
const $logoCoin: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral900,
  width: 24,
  height: 24,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
})
