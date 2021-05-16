import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';

import { Timing } from './Timing';

export const Timer = ({ focusSubject, timerEnd, clearSubject }) => {
    useKeepAwake();

    const DEFAULT_TIME = 0.1;

    const [ isStarted, setIsStarted ] = useState(false);
    const [ minutes, setMinutes ] = useState(DEFAULT_TIME);
    const [ progress, setProgress ] = useState(1);

    const updateProgress = value => setProgress(value);

    const resetAll = () => {
        setProgress(1);
        setIsStarted(false);
    }

    const vibrate = () => {
        if (Platform.OS === "ios") {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 5000);
        } else {
            Vibration.vibrate(5000);
        }
    }

    const onEnd = () => {
        vibrate();
        setMinutes(DEFAULT_TIME);
        resetAll();
        timerEnd();
    }

    const onChangeTime = min => {
        setMinutes(min);
        resetAll();
    }

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown 
                    isPaused={!isStarted}
                    progress={progress}
                    updateProgress={updateProgress}
                    minutes={minutes}
                    onEnd={onEnd}
                />
            </View>
            <View style={{ paddingTop: spacing.xxl }}>
                <Text style={styles.title}>Focusing on:</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={styles.progressWrapper}>
                <ProgressBar 
                    color="#5e84e2"
                    style={styles.progress}
                    progress={progress}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Timing changeTime={onChangeTime}/>
            </View>
            <View style={styles.buttonWrapper}>
                <RoundedButton 
                    title={ !isStarted ? "start": "pause" } 
                    onPress={() => setIsStarted(!isStarted)}
                />
            </View>
            <View style={styles.clearSubject}>
                <RoundedButton
                    title="Cancel"
                    size={40}
                    onPress={() => clearSubject()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
       color: colors.white,
       textAlign: 'center',
       fontSize: fontSizes.md
    },
    task: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: fontSizes.lg,
        color: colors.white
    }, 
    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressWrapper: {
        marginTop: spacing.md
    },
    progress: {
        height: 10,
        borderRadius: 5
    },
    clearSubject: {

    }
});