import { FC } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, ViewStyle } from "react-native"
import { AppStackScreenProps, goBack } from "@/navigators"
import { Icon, ListAsset, Screen, TextField } from "@/components";
import { useHeader } from "@/utils/useHeader"
import { useStores } from "@/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "@/models"

interface SearchScreenProps extends AppStackScreenProps<"Search"> {}

export const SearchScreen: FC<SearchScreenProps> = observer(function SearchScreen() {
  const { crypto } = useStores()

  useHeader(
    {
      leftIcon: "back",
      onLeftPress: goBack,
      TitleComponent: (
        <TextField
          value={crypto.keyword || ""}
          onChangeText={crypto.setKeyword}
          containerStyle={$root}
          RightAccessory={
            crypto.keyword
              ? (props) => (
                  <TouchableOpacity onPress={() => crypto.setKeyword("")} style={props.style}>
                    <Icon icon={"x"} />
                  </TouchableOpacity>
                )
              : undefined
          }
          placeholderTx={"list:search"}
        />
      ),
    },
    [crypto.keyword],
  )
  return (
    <Screen safeAreaEdges={["bottom"]} contentContainerStyle={$root} preset="fixed">
      <ListAsset data={crypto.assetsSearch.slice()} isSearching={!!crypto.keyword} />
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
