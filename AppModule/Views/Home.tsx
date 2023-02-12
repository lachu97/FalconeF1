/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    useColorScheme,
    View,

} from 'react-native';
import FindFalcone from './FinalView'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTokenRequest, fetchPlanetsList, fetchVehiclesList, addTokentoData } from '../Actions/Actions';
function Home(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const dispatch = useDispatch();
    const tokenValue = useSelector(state => state.token)
    useEffect(() => {
        dispatch(fetchTokenRequest())
        dispatch(fetchPlanetsList())
        dispatch(fetchVehiclesList())
    }, [dispatch])
    useEffect(() => {
        if (tokenValue !== '') {
            dispatch(addTokentoData(tokenValue))
        }
    }, [tokenValue])
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1,
    };
    return (
        <SafeAreaView style={backgroundStyle}>
            <View style={styles.sectionContainer}>
                <Text style={styles.textStyle}>Finding Falcon Game</Text>
                <FindFalcone />
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
    textStyle :{
        fontWeight: 'bold',
        fontSize: 22,
    }
});
export default React.memo(Home);