import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMillis = min => min * 60 * 1000;

const formatTime = time => (time < 10) ? `0${time}` : time;

export const Countdown = ({
    minutes,
    isPaused,
    updateProgress,
    onEnd
}) => {

    const interval = React.useRef(null);
    const countDown = () => {
        setMillis(time => {
            if(time === 0) {
                // some func
                clearInterval(interval.current);
                onEnd();
                return time;
            }
            const timeLeft = time - 1000;
            
            return timeLeft;
        });
    }

    useEffect(() => {
        setMillis(minutesToMillis(minutes));
    }, [minutes]);

    useEffect(() => {
        updateProgress(millis / minutesToMillis(minutes));
    }, [millis]);

    useEffect(() => {
        if (isPaused) {
            if (interval.current) clearInterval(interval.current);
            return;
        };
        interval.current = setInterval(countDown, 1000);

        return () => clearInterval(interval.current);
    }, [isPaused]);

    const [ millis, setMillis ] = useState(minutesToMillis(minutes));

    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;

    return (
        <View>
            <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.xxxl,
        color: colors.white,
        fontWeight: 'bold',
        padding: spacing.lg,
        backgroundColor: `rgba(94, 132, 226, .3)`
    }
});