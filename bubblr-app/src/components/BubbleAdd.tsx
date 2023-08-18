import { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB, Overlay, Text, Input, AirbnbRating, Button, Icon } from "@rneui/themed";

export default function BubbleAdd(){
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>();
  const [importance, setImportance] = useState<number>();

  const toggleOpen = useCallback(()=>{
    setOpen((v)=>!v);
  },[])

  const ratingCompleted = useCallback((rating: number)=>{
    setImportance(rating);
    console.log("Rating : " + `${rating}`);
  },[])

  const handleSubmit = useCallback(()=>{
    console.log("Submit clicked")
    setTitle('');
    setImportance(2);
    toggleOpen();
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
      <Overlay isVisible={open} onBackdropPress={toggleOpen} overlayStyle={styles.overlay}>
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
