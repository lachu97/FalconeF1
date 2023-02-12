/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addPlanetListToData, addVehicleListToData, findFalcone } from '../Actions/Actions';
import { useNavigation } from '@react-navigation/native';
const FindFalcone = () => {
    const vehicleData = useSelector(state => state.vehicleData)
    const planetData = useSelector(state => state.planetsData)
    const requestData = useSelector(state => state.requestData)
    const response = useSelector(state => state.response)
    const dispatch = useDispatch()
    //For Modal
    const [showModal, setShowModal] = useState(false)
    //For Planet Data Variable
    const [vehicleList, setVehicleList] = useState(vehicleData)
    const [planetList, setPlanetList] = useState(planetData)
    const [selectedPlanet, setSelectedPlanet] = useState({ name: '', distance: 0 })
    const [selectedVehiclesList, setVehiclesList] = useState([]);
    const [selectedPlanetList, setSelectedPlanetList] = useState([]);
    const navigation = useNavigation()

    //Setting ID to both vehicle and planet list variables
    useEffect(() => {
        setVehicleList(vehicleData.map((item, idx) => {
            return { id: idx + 1, ...item }
        }))
        setPlanetList(planetData.map((item, idx) => {
            return { id: idx + 1, ...item }
        }))

    }, [vehicleData, planetData])

    const computeTime = () => {
        let timeTaken = selectedPlanetList.map((planet, index) => {
            return planet.distance / selectedVehiclesList[index].speed
        })
        return timeTaken.reduce((acc, cv) => acc + cv, 0);
    }
    useEffect(() => {
        if (selectedPlanetList.length === 4) {
            let listData = selectedPlanetList.map((planet) => planet.name)
            dispatch(addPlanetListToData(listData));
        }
        if (selectedVehiclesList.length === 4) {
            let listData = selectedVehiclesList.map((vehicle) => vehicle.name)
            dispatch(addVehicleListToData(listData));
        }
    }, [selectedPlanetList, selectedVehiclesList])

    const handleVehicleSelection = (option, index) => {
        setVehicleList(
            vehicleList.map((item, idx) => {
                if (index === idx) {
                    return { ...item, total_no: item.total_no - 1 }
                }
                return item;
            })
        )

        if (selectedVehiclesList.includes(option)) {

            setVehiclesList(selectedVehiclesList.filter((o) => o.id !== option.id));
        } else {

            setVehiclesList([...selectedVehiclesList, option]);
        }
        setShowModal(false)
    }
    const refreshState = () => {
        setPlanetList(planetData)
        setSelectedPlanet({ name: '', distance: 0 })
        setSelectedPlanetList([])
        setVehiclesList([])
        setVehicleList(vehicleData)
    }
    const onPressOption = (option) => {
        if (selectedPlanetList.length === 4 && !selectedPlanetList.includes(option)) {
            return;
        }

        if (selectedPlanetList.includes(option)) {
            setSelectedPlanetList(selectedPlanetList.filter((o) => o.id !== option.id));
        } else {
            setSelectedPlanetList([...selectedPlanetList, option]);
        }
        setSelectedPlanet(option);
        setShowModal(true)

    };
    return (
        <View style={styles.container}>
            <View style={styles.divider}/>

            {planetList.map((option) => (
                <TouchableOpacity
                    key={option.id}
                    style={[
                        styles.option,
                        selectedPlanetList.includes(option) && styles.selectedOption,
                        selectedPlanetList.length === 4 && !selectedPlanetList.includes(option) && styles.disabledOption,
                    ]}
                    onPress={() => onPressOption(option)}
                    disabled={selectedPlanetList.length === 4 && !selectedPlanetList.includes(option)}
                >
                    <Text style={styles.optionText}>{option.name} := {option.distance}</Text>
                </TouchableOpacity>
            ))}
            <View style={styles.refreshContainer}>
                <TouchableOpacity onPress={() => refreshState()}>
                    <Text style={{ color: 'black', fontSize: 12, fontWeight: 'bold' }}>Refresh</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.selectedValuesContainer}>
                <Text style={styles.textstyle}>Planets=> </Text>
                {selectedPlanetList.map((option) => (
                    <Text numberOfLines={1} key={option.id} style={styles.selectedValue}>
                        {option.name}:
                        {option.distance}
                    </Text>
                ))}
            </View>
            <View style={styles.selectedValuesContainer}>
                <Text style={styles.textstyle}>Vehicles=> </Text>
                {selectedVehiclesList.map((option) => (
                    <Text numberOfLines={1} key={option.id} style={styles.selectedValue}>
                        {option.name}:
                        {option.max_distance}
                    </Text>
                ))}
            </View>
            <Modal visible={showModal} animationType="slide" transparent={true} onRequestClose={() => setShowModal(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalContainer}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'black' }}>Available Vehicle For {selectedPlanet.name} : {selectedPlanet.distance}</Text>
                            {vehicleList.map((item, index) => (
                                <TouchableOpacity
                                    style={[
                                        styles.item,
                                        {
                                            opacity: item.total_no > 0 ? 1 : 0.5,
                                            backgroundColor: item.total_no > 0 ? 'green' : 'red',
                                        },
                                        { opacity: item.max_distance >= selectedPlanet.distance ? 1 : 0.3, }
                                    ]}
                                    disabled={item.max_distance >= selectedPlanet.distance ? false : true}
                                    onPress={() => handleVehicleSelection(item, index)}>

                                    <Text numberOfLines={1} style={{ color: 'black' }}>{item.name} : {item.total_no}:{item.max_distance}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.divider}/>
            <Button title="Find Falcon" onPress={() => {
                
                if (selectedPlanetList.length === 4 && selectedVehiclesList.length === 4) {
                    let value = computeTime()
                    dispatch(findFalcone(requestData))
                    navigation.navigate('Result', {
                        time: value,
                    })
                    setTimeout(() => {
                        refreshState()
                    }, 1500)
                } else {
                    alert('Please Select atleast 4 Planets and 4 Vehicles')
                }
           

            }} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    option: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        margin: 5,
        borderRadius: 5,
    },
    selectedOption: {
        backgroundColor: 'green',
    },
    disabledOption: {
        backgroundColor: 'red',
    },
    optionText: {
        fontWeight: 'bold',
        color: 'black'
    },
    item: {
        padding: 12,
        marginVertical: 5,
    },
    selectedValuesContainer: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        marginTop: 20,
    },
    selectedValue: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    textstyle: {
        fontWeight: 'light',
        marginRight: 10,
        fontSize: 17
    },
    modalContainer: {
        backgroundColor: 'lightgrey',
        height: '50%',
        alignSelf: 'center',
        width: '75%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    refreshContainer: {
        margin: 10,
        borderBottomWidth: 3,
        padding: 10,
        borderRadius: 2,
        elevation: 10,
        backgroundColor: 'violet',
    },
    divider:{
        marginTop:25,
    }
});
export default React.memo(FindFalcone);