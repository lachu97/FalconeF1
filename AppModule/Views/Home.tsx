/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
    Button,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    useColorScheme,
    View,

} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTokenRequest, fetchPlanetsList, fetchVehiclesList } from '../Actions/Actions';
function Home() {
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();
    const tokenValue = useSelector(state => state.token)
    const planetList = useSelector(state => state.planetsData)
    const vehicletList = useSelector(state => state.vehicleData)
    useEffect(() => {
        console.log('Dispatching Token API')
        dispatch(fetchTokenRequest())
        dispatch(fetchPlanetsList())
        dispatch(fetchVehiclesList())
    }, [dispatch])
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1,
    };
    return (
        <SafeAreaView style={backgroundStyle}>
            <View style={styles.sectionContainer}>
                <Text>Hello Finding Falconer Problem</Text>
                <Text>Token Values == {tokenValue}</Text>
                <Text>{planetList.map((data) => data.name)}</Text>
                <Text>{vehicletList.map((data) => data.name)}</Text>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40
    },
});
export default Home;