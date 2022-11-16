import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NavigationProp} from '../types/navigationTypes';
import {useAppSelector} from '../store/hook';
import NewsData from '../types/newsData';

const NewsDetailsScreen = () => {
  const route = useRoute<RouteProp<NavigationProp>>();
  const newsId = route.params?.newsId!;
  const AllNews: Array<NewsData> = useAppSelector(state => state.news.newsData);

  const newsData: NewsData = AllNews.find(news => news._id === newsId)!;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.detailsTitle}>
          <Text style={styles.detailsTitleText}>{newsData.title}</Text>
          <Text style={styles.authorText}>By: {newsData.author}</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: newsData.media}}
            // resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.summaryContainer}>
          <Text>{newsData.summary}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default NewsDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    height: 220,
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 25,
    alignItems: 'center',
    // margin: 10,
  },
  detailsTitleText: {
    fontWeight: '500',
    fontSize: 18,
    // justifyContent: "flex-start",
  },
  authorText: {
    paddingTop: 10,
    fontSize: 15,
    fontWeight: '300',
  },
  detailsTitle: {
    margin: 15,
  },
  summaryContainer: {
    padding: 15,
  },
});
