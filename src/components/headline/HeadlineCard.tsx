import {Platform, StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import NewsData from '../../types/newsData';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigationProp} from '../../types/navigationTypes';
interface HeadlineCardProps {
  newsData: NewsData;
}

const HeadlineCard: React.FC<HeadlineCardProps> = ({newsData}) => {
  const Navigation = useNavigation<NativeStackNavigationProp<NavigationProp>>();
  function navigateHandler() {
    Navigation.navigate('NewsDetails', {
      newsId: newsData._id,
    });
  }
  return (
    <Pressable
      onPress={navigateHandler}
      android_ripple={{color: '#ccc'}}
      style={({pressed}) => (pressed ? styles.pressed : null)}>
      <View style={styles.card}>
        <View style={styles.cardImageContainer}>
          <Image source={{uri: newsData.media}} style={styles.cardImage} />
        </View>
        <View style={styles.date}>
          <Text style={styles.text}>{newsData.published_date}</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.cardText}>{newsData.title}</Text>
        </View>
        <View style={styles.authorTextCon}>
          <Text style={styles.authorText}>By {newsData.author}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default HeadlineCard;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.85,
  },
  card: {
    flex: 1,
    // height: 600,
    width: Platform.OS === 'android' ? 345 : 370,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // paddingTop: 15,
    borderRadius: 30,
  },
  cardImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 30,
    shadowOpacity: 0.23,
    overflow: 'hidden',
    // overflow: Platform.select({ ios: "hidden", android: "visible" }),
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardText: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  date: {
    alignItems: 'flex-end',
    padding: 10,
  },
  text: {
    fontSize: 10,
  },
  authorTextCon: {
    marginTop: 10,
    padding: 10,
  },
  authorText: {
    fontSize: 15,
    fontWeight: '200',
    paddingLeft: 10,
  },
});
