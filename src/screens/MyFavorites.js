import {PRE_IMAGE, API_KEY} from '../Utilities';
import React from 'react';
import {ListItem} from 'react-native-elements';
import {SafeAreaView, StatusBar, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const MyFavorites = () => {
  const [data, setData] = React.useState([]);
  const keyExtractor = (item, index) => index.toString();
  const favorites = useSelector((state) => state.favorite.favorite);

  React.useEffect(() => {
    const fetchData = async () => {
      let arrData = [];
      for (let index = 0; index < favorites.length; index++) {
        try {
          const url = `https://api.themoviedb.org/3/movie/${favorites[index]}?api_key=${API_KEY}`;
          let response = await fetch(url);
          let newData = await response.json();
          arrData.push(newData);
        } catch (error) {}
      }
      setData(arrData);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(favorites)]);

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
      key={item?.name}
    />
  );
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <FlatList
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </>
  );
};
export default MyFavorites;
