import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';
import { statuses } from './src/utils/statuses';

export default function App() {

  const [ focusSubject, setFocusSubject ] = useState(null);
  const [ focusHistory, setFocusHistory ] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([ ...focusHistory, { subject, status, key: String(focusHistory.length + 1) } ]);
  }

  const addSubject = subject => setFocusSubject(subject);

  const handleTimerEnd = () => {
    setFocusSubject(null);
    addFocusHistorySubjectWithStatus(focusSubject, statuses.COMPLETE);
  }

  const handleClearSubject = () => {
    setFocusSubject(null);
    addFocusHistorySubjectWithStatus(focusSubject, statuses.CANCELED);
  }

  const clearHistory = () => {
    setFocusHistory([]);
  }

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);
  
  return (
    <View style={styles.container}>
      { focusSubject ? (
        <Timer 
          focusSubject={focusSubject}
          timerEnd={handleTimerEnd}
          clearSubject={handleClearSubject}
        />
      ) : (
        <>
          <Focus addSubject={addSubject}/>
          <FocusHistory 
            focusHistory={focusHistory}
            onClear={clearHistory}
          />
        </>
      ) }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === "ios" ? spacing.lg : spacing.md,
    backgroundColor: colors.darkBlue
  },
});
