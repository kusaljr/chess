import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function TopComponent() {
  const dateString = function dateToWords() {
    const date = new Date();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    function getOrdinalSuffix(day: number) {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
        default:
          return 'th';
      }
    }

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const suffix = getOrdinalSuffix(day);

    return `${month} ${day}${suffix}, ${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chess_piece_-_Black_king.JPG/605px-Chess_piece_-_Black_king.JPG',
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userIdText}>{'Connecting to WS...'}</Text>
          <Text style={styles.dateText}>{dateString()}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
  userIdText: {
    fontSize: 12,
    color: 'gray',
  },
  dateText: {
    fontSize: 14,
    color: 'white',
  },
});
