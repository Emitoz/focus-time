import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';

export const FocusHistory = ({ focusHistory, onClear }) => {

    const clearHistory = () => {
        onClear();
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                { !!focusHistory.length && 
                    (
                        <>
                            <Text style={styles.title}>Things I've focused on:</Text>
                            <FlatList
                                style={{ flex: 1 }}
                                contentContainerStyle={{ flex: 1, alignItems: 'center' }}
                                data={focusHistory}
                                renderItem={({ item, index }) => (
                                    <Text style={styles.historyItem(item.status)}>{ item.subject }</Text>
                                )}
                            />
                            <View style={styles.clearContainer}>
                                <RoundedButton 
                                    size={60}
                                    title="Clear"
                                    onPress={() => onClear()}
                                />
                            </View>
                        </>
                    )
                }
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        color: colors.white,
        fontSize: fontSizes.lg,
    },
    historyItem: status => ({
        color: status > 1 ? 'red' : 'green',
        fontSize: fontSizes.md
    }),
    clearContainer: {
        alignItems: 'center',
        padding: spacing.md
    }
});