import * as React from 'react';
import { View, TouchableOpacity, ScrollView, FlatList, StyleSheet, Dimensions, Image, ImageBackground, Text, CameraRoll } from 'react-native';
import firebase from './../Firebase.js';

class MyListItem extends React.PureComponent {
  render() {
    return (
            <TouchableOpacity style={this.props.data.item.style} onPress={()=>this.props.selectItem(this.props.data)} >
              <Image style={styles.imageBg} source={require('../statics/pictures/cloth-bg.png')} />
              <Image style={styles.imageCloth} source={{uri:this.props.data.item.imgUrl}} />
            </TouchableOpacity>
    )
  }
}
export default class BasicItemTab extends React.PureComponent {
  componentDidMount() {
    this.refreshContents();
  }
  refreshContents = () =>{
     firebase.database().ref('basicItems/').on('value', function (snapshot) {
      var dictArray = snapshot.val()
      var arrayLength = dictArray.length;
      var array_bottoms = new Array();
      // for (var i = 1; i < arrayLength; i++) {
      //     if (dictArray[i]["type"]==this.props.type){
      //       array_bottoms.push(dictArray[i]["img_url"]);
      //     }
      // }
      for (var key in dictArray){
          if (dictArray[key]["type"]==this.props.type){
            dictArray[key]['isSelect']=false;
            dictArray[key]['style']=styles.imageContainer;
            array_bottoms.push(dictArray[key]);
          }        
      }
      this.setState({trousersUrl: array_bottoms});
      // console.log(this.state.trousersUrl, this.props.type,dictArray)
    }.bind(this));    
  }


  selectItem = data => {
    // alert('pressed!'+data.item.isSelect);
    data.item.isSelect = !data.item.isSelect;
    data.item.style = data.item.isSelect
     ? styles.imageSelected: styles.imageContainer;
   
  const index = this.state.trousersUrl.findIndex(
     item => data.item.imgUrl === item.imgUrl
  );
  this.state.trousersUrl[index] = data.item;
   
   this.setState({
     trousersUrl: this.state.trousersUrl,
     idol: !this.state.idol
   });
   if(data.item.isSelect){
     this.props.select(data.item);
   }
   else{
     this.props.delete(data.item);
   }
  };
  // selectItem = (item)=>{
  //   var victim = {...this.state.trousersUrl};
  //   var array_bottoms = new Array();
  //   for (var key in victim){
  //       if (victim[key].imgUrl==item.imgUrl){
  //         victim[key].isSelect = !victim[key].isSelect;
  //         victim[key].style = victim[key].isSelect? styles.imageSelected : styles.imageContainer;
  //       }        
  //         array_bottoms.push(victim[key]);
  //   this.setState({trousersUrl: array_bottoms});
  //   }
  //   // console.log(this.state.trousersUrl, victim)
  // }

  renderItem = data => (
    <MyListItem data={data} selectItem={this.selectItem} />
  )


  state = {
    trousersUrl: [],
    idol: true,

  };


  render() {
    return(
        <FlatList
          data={this.state.trousersUrl}
          extraData={this.state.idol}
          numColumns={3}
          renderItem={this.renderItem}
          keyExtractor={item => item.imgUrl}
          />)
  }
}

const styles = StyleSheet.create({
  imageCloth: {
    flex: 0,
    position: 'absolute',
    left: 25,
    top: 10,
    height: 125,
    width: 80,
    resizeMode: 'contain',
  },
  imageBg: {
    flex: 0,
    height: 150,
    width: 100,
    resizeMode: 'contain',
  },
  imageContainer: {
    flex: 1,
    top: 4,
    bottom: 0,
    left: 4,
    right: 0,
    opacity: 0.8,
    alignSelf: 'center'
  },
  imageSelected: {
    flex: 1,
    top: 4,
    bottom: 0,
    left: 4,
    right: 0,
    opacity: 0.8,
    borderColor:'#F46755',
    borderWidth: 2,
    alignSelf: 'center'
  },
  labelText: {
    color: 'white'
  },
  scene: {
    flex: 0,
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: 'gray',
  },
});