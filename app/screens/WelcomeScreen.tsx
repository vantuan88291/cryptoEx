import { observer } from "mobx-react-lite"
import { FC } from "react"
import { View, ViewStyle } from "react-native"
import { Button, Screen, ListAsset } from "@/components"
import { AppStackScreenProps, navigate } from "@/navigators"
import { $styles } from "@/theme"
import { useHeader } from "@/utils/useHeader"
import { useStores } from "@/models"
import { typeAsset } from "@/models/crypto/Crypto.props"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  useHeader(
    {
      rightIcon: "search",
      onRightPress: () => navigate("Search"),
      titleTx: "welcomeScreen:title",
    },
    [],
  )
  const { crypto } = useStores()
  const onChangeType = (value?: typeAsset) => () => {
    crypto.setTypeAsset(value)
  }
  return (
    <Screen preset="fixed" safeAreaEdges={["bottom"]} contentContainerStyle={$styles.flex1}>
      <ListAsset data={crypto.assets.slice()} />
      <View style={$bottomContainer}>
        <Button onPress={crypto.clearData} style={$flex} tx={"welcomeScreen:clear"} />
        <Button onPress={crypto.insertData} style={$flex} tx={"welcomeScreen:insert"} />
        <Button
          preset={crypto.typeAsset === "crypto" ? "filled" : "default"}
          onPress={onChangeType("crypto")}
          style={$flex}
          tx={"welcomeScreen:crypto"}
        />
        <Button
          preset={crypto.typeAsset === "fiat" ? "filled" : "default"}
          onPress={onChangeType("fiat")}
          style={$flex}
          tx={"welcomeScreen:fiat"}
        />
        <Button
          preset={crypto.typeAsset === null ? "filled" : "default"}
          onPress={onChangeType()}
          style={$flex}
          tx={"welcomeScreen:all"}
        />
      </View>
    </Screen>
  )
})

const $bottomContainer: ViewStyle = {
  flexDirection: "row",
  gap: 5,
  padding: 5,
}

const $flex: ViewStyle = {
  flex: 1,
}
