import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ changeTime }) => {

    const timings = [1, 5, 10, 15, 20, 30];

    return (
        <>
        {
            timings.map(timing => (
                <View style={styles.timingButton} key={timings.indexOf(timing)}>
                    <RoundedButton 
                        title={timing}
                        onPress={() => changeTime(timing)}
                        size={45}
                    />
                </View>
            ))
        }
        </>
    );
}

const styles = StyleSheet.create({
    timingButton: {
        flex: 1,
        alignItems: 'center'
    }
});