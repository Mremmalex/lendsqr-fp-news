import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AppSafeArea from '../../components/shared/ui/AppSafeArea';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import {fetchAllNews} from '../../store/ApiHooks/newsHook';
import TextButton from '../../components/shared/ui/TextButton';
import Colors from '../../constants/color';
import NewsData from '../../types/newsData';
import HeadlineCard from '../../components/headline/HeadlineCard';
import ListTile from '../../components/latest/ListTile';

const HomeScreen = (): JSX.Element => {
  const headlineNews: Array<NewsData> = useAppSelector(
    state => state.news.headline,
  );
  const isDataLoading: boolean = useAppSelector(state => state.news.loading);

  const allNews: Array<NewsData> = useAppSelector(state => state.news.newsData);

  const disPatch = useAppDispatch();

  useEffect(() => {
    disPatch(fetchAllNews());
  }, [disPatch]);

  function renderItem({item}: {item: NewsData}) {
    return <ListTile item={item} />;
  }

  function throwRuntimeErrorhandler() {
    throw new Error('Invalid Action');
  }

  return (
    <AppSafeArea>
      <View style={styles.screen}>
        <View style={styles.headlineContainer}>
          <View style={styles.textContainer}>
            <View>
              <Text style={styles.text}>Headline</Text>
            </View>
            <View>
              <TextButton
                onPress={throwRuntimeErrorhandler}
                textStyle={styles.textButton}>
                See All
              </TextButton>
            </View>
          </View>
          {isDataLoading ? (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          ) : (
            <ScrollView horizontal style={styles.cardScroll}>
              {headlineNews.map(newsData => {
                return <HeadlineCard key={newsData._id} newsData={newsData} />;
              })}
            </ScrollView>
          )}
        </View>
        <View style={styles.latestNewsContainer}>
          <View>
            <Text style={styles.latestText}>Latest News</Text>
          </View>
        </View>
        {isDataLoading ? (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <View style={styles.LatestContainer}>
            <FlatList data={allNews} renderItem={renderItem} />
          </View>
        )}
      </View>
    </AppSafeArea>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // width: "100%",
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
  },

  textButton: {
    color: Colors.primaryColor,
    paddingTop: 6,
  },
  headlineContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  cardScroll: {
    height: 600,
  },

  LatestContainer: {
    flex: 1,
    height: 200,
  },
  latestText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    fontStyle: 'italic',
  },
  latestNewsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
