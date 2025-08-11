import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getPrimaryRed } from '../../../styles/colors';

interface HeatmapStatsProps {
  totalPoints: number;
  userPoints: number;
  isDarkMode: boolean;
  visible: boolean;
}

const HeatmapStats: React.FC<HeatmapStatsProps> = ({
  totalPoints,
  userPoints,
  isDarkMode,
  visible
}) => {
  if (!visible) return null;

  return (
    <View style={[
      styles.container, 
      isDarkMode ? styles.containerDark : styles.containerLight
    ]}>
      <View style={styles.header}>
        <Ionicons 
          name="analytics" 
          size={18} 
          color={getPrimaryRed(isDarkMode)} 
          style={styles.icon}
        />
        <Text style={[
          styles.title, 
          isDarkMode ? styles.titleDark : styles.titleLight
        ]}>
          Estadísticas
        </Text>
      </View>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[
            styles.statNumber, 
            isDarkMode ? styles.statNumberDark : styles.statNumberLight
          ]}>
            {totalPoints}
          </Text>
          <Text style={[
            styles.statLabel, 
            isDarkMode ? styles.statLabelDark : styles.statLabelLight
          ]}>
            Total
          </Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <Text style={[
            styles.statNumber, 
            { color: getPrimaryRed(isDarkMode) }
          ]}>
            {userPoints}
          </Text>
          <Text style={[
            styles.statLabel, 
            isDarkMode ? styles.statLabelDark : styles.statLabelLight
          ]}>
            Míos
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 16,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    minWidth: 140,
  },
  containerLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  containerDark: {
    backgroundColor: 'rgba(42, 42, 42, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  titleLight: {
    color: '#333',
  },
  titleDark: {
    color: '#FFF',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statNumberLight: {
    color: '#333',
  },
  statNumberDark: {
    color: '#FFF',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statLabelLight: {
    color: '#666',
  },
  statLabelDark: {
    color: '#CCC',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginHorizontal: 8,
  },
});

export default HeatmapStats;