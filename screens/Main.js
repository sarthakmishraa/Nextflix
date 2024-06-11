import { useState } from "react";

import { GoogleGenerativeAI } from "@google/generative-ai";

import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, ToastAndroid } from "react-native";

export const Main = () => {
    const [inputMovieName, setInputMovieName] = useState(null);
    const [response, setResponse] = useState(null);
    const [responseLoading, setResponseLoading] = useState(false);

    const getResponse = async() => {
        try {
            Keyboard.dismiss();
            if(inputMovieName === "" || inputMovieName === null) {
                ToastAndroid.show("Please enter a movie's title", ToastAndroid.SHORT);
            }
            else {
                setResponseLoading(true);
                const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
                const genAI = new GoogleGenerativeAI(API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                const prompt = `
                You are a movie recommender system, I will provide you a movie name.
                You have to recommend me atleast 5 movies. Keep the response short. 
                Movie name = ${inputMovieName}`;

                const res = await model.generateContent(prompt);
                const response = res.response;
                const text = response.text();
                setResponse(text);
                setResponseLoading(false);
            }
        }
        catch(error) {
            console.log(error);
        }
    };

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.inputForm}>
                    <TextInput
                        style={styles.input}
                        placeholder="Movie name..."
                        placeholderTextColor="gray"
                        onChangeText={(val) => setInputMovieName(val)}
                    />
                    <TouchableOpacity
                        disabled={responseLoading}
                        onPress={getResponse}
                    >
                        {
                            responseLoading ? (
                                <View style={styles.buttonLoadingState}>
                                    <Text style={styles.buttonText}>Enter</Text>
                                </View>
                            ):(
                                <View style={styles.button}>
                                    <Text style={styles.buttonText}>Enter</Text>
                                </View>
                            )
                        }
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.responseContent}>
                    {
                        responseLoading ? (
                            <Text style={styles.loadingText}>Loading...</Text>
                        ):(
                            <Text style={styles.response}>{response}</Text>
                        )
                    }
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    inputForm: {
        margin: 40,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    input: {
        borderColor: "lightgray",
        borderBottomWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 20,
        color: "white",
        width: 240
    },
    button: {
        padding: 10,
        backgroundColor: "red",
        width: 80,
        borderRadius: 50,
        marginVertical: 10,
    },
    buttonLoadingState: {
        padding: 10,
        backgroundColor: "gray",
        width: 80,
        borderRadius: 50,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    responseContent: {
        flex: 1,
        marginBottom: 10,
        borderWidth: 1,
    },
    response: {
        color: "white",
        marginHorizontal: 40,
        fontSize: 18
    },
    loadingText: {
        color: "red",
        fontWeight: "bold",
        fontSize: 36,
        marginHorizontal: 40,
        textAlign: "center"
    }
})