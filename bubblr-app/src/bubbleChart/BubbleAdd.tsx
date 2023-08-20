import 'react-native-url-polyfill/auto'
import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { FAB, Overlay, Text, Input, AirbnbRating, Button, Icon } from "@rneui/themed";
import { bubbleController, BubbleData } from "./bubbleController";
import { useAuthContext } from "../context/auth-context";
import { bubbleImportances } from "./config";

export default function BubbleAdd(){
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [importance, setImportance] = useState<number>(-1);

  const session = useAuthContext()?.session;

  const toggleOpen = useCallback(()=>{
    setOpen((v)=>!v);
  },[])

  const ratingCompleted = useCallback((rating: number)=>{
    setImportance(rating);
    console.log("Rating : " + `${rating}`);
  },[])

  const handleSubmit = ()=>{
    if( !session ) return
    const newData: BubbleData = {
      user_id: session.user.id,
      name: title,
      size: bubbleImportances[importance].minSize,
      importance: importance,
    }
    if( !bubbleController.POST(session.user.id, newData) ){
      console.log("Failed to submit data...");
    };
    setTitle('');
    setImportance(3);
    toggleOpen();
  }

  return(
    <>
      <FAB
        visible={true}
        icon={{ name: 'add', color: 'white' }}
        size="large"
        placement="right"
        onPress={toggleOpen}
        />
      <Overlay
        isVisible={open}
        onBackdropPress={toggleOpen}
        overlayStyle={styles.overlay}
        ModalComponent={Modal}
      >
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            label="New Task"
            leftIcon={<Icon type='ionicon' name='bookmark-outline'/>}
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="eg. Call <an important other> ..."
          />
        </View>
        <View style={[styles.verticallySpaced, styles.center]}>
          <Text>Task importance</Text>
          <AirbnbRating
            onFinishRating={ratingCompleted}
            defaultRating={importance}
            starImage="https://img.icons8.com/?size=512&id=31649&format=png"
            reviews={["Ignorable", "Low", "Average", "High", "Super"]}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </Overlay>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    minWidth: 480,
    minHeight: 360,
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
  },
  center: {
    alignItems: "center",
  }
})
