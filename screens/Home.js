import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export const Home = ({ navigation }) => {
    const BGImage = require("../assets/nextflix-home-bg.jpeg");
    const goHandler = () => {
        navigation.navigate("Nextflix");
    }
    return(
        <View style={styles.container}>
            <ImageBackground
                source={BGImage}
                style={styles.BGImage}
                resizeMode="cover"
                blurRadius={5}
            >
                <Text style={styles.text}>Can't Decide? We Can.</Text>
                <TouchableOpacity
                style={styles.button}
                onPress={goHandler}
                >
                <Text style={styles.buttonText}>Go</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    BGImage: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    text: {
      paddingHorizontal: 10,
      color: "white",
      fontSize: 36,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    },
    button: {
      padding: 10,
      backgroundColor: "red",
      width: 80,
      borderRadius: 10,
      marginVertical: 10,
    },
    buttonText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "lightgray",
      textAlign: "center"
    }
  });