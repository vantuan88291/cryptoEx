import { View, ViewStyle, ActivityIndicator } from "react-native"
import { observer } from "mobx-react-lite"
import { useStores } from "app/models"
import { colors } from "app/theme"
import { useMemo } from "react"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(28,26,26,0.57)",
}

const PARENT: ViewStyle = {
  backgroundColor: colors.palette.overlay50,
  paddingHorizontal: 30,
  paddingVertical: 23,
  borderRadius: 6,
  alignSelf: "center",
}

/**
 * Describe your component here
 */
export const Loading = observer(function Loading() {
  const { commons } = useStores()
  return useMemo(() => {
    if (!commons.loading) return null
    return (
      <View style={CONTAINER}>
        <View style={PARENT}>
          <ActivityIndicator size={"large"} color={colors.background} />
        </View>
      </View>
    )
  }, [commons.loading])
})
