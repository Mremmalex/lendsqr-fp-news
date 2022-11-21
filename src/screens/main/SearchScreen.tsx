import {FlatList, View} from 'react-native';
import React, {useState} from 'react';
import AppSafeArea from '../../components/shared/ui/AppSafeArea';
import TextFormInput from '../../components/shared/ui/TextFormInput';
import {useAppDispatch, useAppSelector} from '../../store/hook';
import ListTile from '../../components/Card/ListTile';
import NewsData from '../../types/newsData';
import {searchForNews} from '../../store/ApiHooks/newsHook';

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const allNewsData = useAppSelector(state => state.news.newsData);
  const newsToLoad = allNewsData.slice(2, 24);
  const searchedNewState = useAppSelector(state => state.search);

  function renderItem({item}: {item: NewsData}) {
    return <ListTile item={item} />;
  }

  const dispatch = useAppDispatch();

  function changeTextHandler(value: string) {
    setSearch(value);
  }
  function searchNewsHandler() {
    dispatch(searchForNews(search));
  }
  return (
    <AppSafeArea>
      <View>
        <View>
          <TextFormInput
            placeholder="search News"
            returnKeyType="search"
            clearButtonMode="while-editing"
            value={search}
            onChangeText={changeTextHandler}
            onSubmitEditing={searchNewsHandler}
          />
        </View>

        {searchedNewState.searchedNews ? (
          <View>
            <FlatList
              data={searchedNewState.searchedNews}
              renderItem={renderItem}
            />
          </View>
        ) : (
          <View>
            <FlatList data={newsToLoad} renderItem={renderItem} />
          </View>
        )}
      </View>
    </AppSafeArea>
  );
};

export default SearchScreen;

// const styles = StyleSheet.create({
//   searchText: {},
// });
