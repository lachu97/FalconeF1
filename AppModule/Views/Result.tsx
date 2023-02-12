/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Text, useColorScheme, SafeAreaView, StyleSheet, View, Button } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';



const ResultPage = ({ route }) => {
    const timeTaken = route.params.time
    const response = useSelector(state => state.response)
    const [result, setResult] = useState({})
    const navigation = useNavigation()
    const isDarkMode = useColorScheme() === 'dark';
    useEffect(() => {
        setResult(response)
    }, [response])
    const backgroundStyle = {

        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1,
    };
    return (
        <SafeAreaView style={backgroundStyle}>
            <View style={styles.sectionContainer}>
                {result.status === 'success' ? <Text numberOfLines={2} style={styles.textStyle}>Success!! Found Falcone at :=> {result.planet_name}</Text> : <Text style={styles.textStyle}>Failed ..Oops Try Again </Text>}
                <View style={styles.divider}/>
                <Text style={styles.textStyle}>Time Taken to Find : {timeTaken} </Text>
                <View style={styles.divider}/>
                <Button title="Go back and Play Again" onPress={() => {
                    navigation.goBack()
                    setResult({})
                }} />
            </View>

        </SafeAreaView>
    );
};
const styles = StyleSheet.create({

    sectionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    divider:{
        marginTop:25,
    }
});
export default React.memo(ResultPage);
