/* eslint-disable prettier/prettier */
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Views/Home'
import ResultPage from './../Views/Result';
import { Easing, Animated } from 'react-native';
const Stack = createStackNavigator();
const config = {
    animation: 'timing',
    config: {
        duration: 500,
        easing: Easing.inOut(Easing.quad),
    },
};

const transitionSpec = {
    open: {
        animation: 'timing',
        config: {
            duration: 700,
            easing: Easing.inOut(Easing.quad),
            toValue: 1,
            useNativeDriver: true,
        },
    },
    close: {
        animation: 'timing',
        config: {
            duration: 700,
            easing: Easing.inOut(Easing.quad),
            toValue: 0,
            useNativeDriver: true,
        },
    },
};
const MyStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                cardOverlayEnabled: true,
                transitionSpec,
                configureTransition: (transitionProps, prevTransitionProps) => {
                    const opacity = transitionProps.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    });
                    const translateY = transitionProps.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [100, 0],
                    });
                    return {
                        cardStyle: {
                            opacity,
                            transform: [{ translateY }],
                        },
                    };
                },
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Result" component={ResultPage} />
        </Stack.Navigator>
    );
}
export default MyStack;