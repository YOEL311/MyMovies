import React from 'react';
import {
  Modal,
  Alert,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
} from 'react-native';
import {PRE_IMAGE} from '../Utilities';
import {Icon} from 'react-native-elements';

const ModelMovie = (props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isOpen}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.sectionImages}>
            <Image
              style={styles.image}
              source={{
                uri: `${PRE_IMAGE}${props?.item?.poster_path}`,
              }}
            />
            <Image
              style={styles.image}
              source={{
                uri: `${PRE_IMAGE}${props?.item?.backdrop_path}`,
              }}
            />
          </View>
          <Text>{props?.item?.overview}</Text>

          <TouchableHighlight
            style={{...styles.openButton, backgroundColor: '#2196F3'}}
            onPress={props.closeMe}>
            <Text style={styles.textStyle}>back</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() =>
              props?.onClickHeart(props?.item?.id, props?.isFavorite)
            }>
            <Icon
              style={{alignSelf: 'flex-end'}}
              name={props?.isFavorite ? 'heart' : 'heart-off'}
              type="material-community"
              color="red"
            />
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 300,
    height: 500,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default ModelMovie;
