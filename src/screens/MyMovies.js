import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableHighlight,
} from 'react-native';
import Model from '../components/Model';
import {Badge} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {ListItem} from 'react-native-elements';
import {PRE_IMAGE, API_KEY} from '../Utilities';
import {addFavorite, removeFavorite} from '../actions/favoriteAction';
const MyMovies = ({navigation}) => {
  const userInfo = useSelector((state) => state.auth.user);
  const favorite = useSelector((state) => state.favorite.favorite);

  const [isModelOpen, setIsModelOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [isSelectedFavorite, setIsSelectedFavorite] = React.useState(false);

  React.useEffect(() => {
    getMovies();
  }, []);

  React.useEffect(() => {
    changeBar();
    setIsSelectedFavorite(favorite.includes(`${selected?.id}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(favorite)]);

  const getMovies = async () => {
    const nowPage = page + 1;
    setPage(nowPage);
    try {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${nowPage}`;
      let response = await fetch(url);
      let newData = await response.json();
      const result = newData.results;
      setData((oldArray) => [...oldArray, ...result]);
    } catch (error) {}
  };

  const dispatchFetchPage = () => {
    getMovies();
  };

  const changeBar = () => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight onPress={() => navigation.navigate('MyFavorites')}>
          <View>
            <Text>My favorites</Text>
            <Badge value={favorite.length} status="success" />
          </View>
        </TouchableHighlight>
      ),
    });
  };

  const onClickHeart = (itemId, toggle) => {
    if (toggle) {
      removeFavorite(userInfo?.uid, itemId);
    } else {
      addFavorite(userInfo?.uid, itemId);
    }
  };

  const renderItem = ({item}) => (
    <ListItem
      title={item?.title}
      subtitle={item?.overview}
      leftAvatar={{source: {uri: `${PRE_IMAGE}${item?.poster_path}`}}}
      badge={{
        value: item?.vote_average,
        textStyle: {color: 'white'},
        containerStyle: {marginTop: -20},
      }}
      bottomDivider
      chevron
      onPress={() => {
        setSelected(item);
        setIsSelectedFavorite(favorite.includes(`${item?.id}`));
        setIsModelOpen(true);
      }}
      key={item?.name}
    />
  );

  const keyExtractor = (item, index) => index.toString();
  return (
    <>
      <SafeAreaView>
        <Model
          isOpen={isModelOpen}
          item={selected}
          isFavorite={isSelectedFavorite}
          onClickHeart={onClickHeart}
          closeMe={() => setIsModelOpen(false)}
        />
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
          onEndReached={() => dispatchFetchPage()}
        />
      </SafeAreaView>
    </>
  );
};

export default MyMovies;
