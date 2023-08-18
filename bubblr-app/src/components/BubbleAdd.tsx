import { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB, Overlay, Text, Input } from "@rneui/themed";

export default function BubbleAdd(){
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(()=>{
    setOpen((v)=>!v);
  },[])

  return(
    <>
      <FAB
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        size="large"
        placement="right"
        onPress={toggleOpen}
        />
      <Overlay isVisible={open} onBackdropPress={toggleOpen}>
        <Text>asdf</Text>
      </Overlay>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  }
})
