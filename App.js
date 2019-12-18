import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Alert,Button,Image } from 'react-native';
import { Ionicons,AntDesign,EvilIcons,Entypo} from '@expo/vector-icons';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      gameState:[
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer:1,

       
    }
  }
  componentDidMount(){
    this.initgame();
  }
  initgame=()=>{
    this.setState({gameState:
    [
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ],
    currentPlayer:1,
    
    })
  }
  renderIcon = (row,col)=>{
    let value=this.state.gameState[row][col];
    switch(value){
      case 1: return <Image
      style={{width: 50, height: 50}}
      source={require('./assets/delete.png')}
    />;
      case -1: return <Image
      style={{width: 50, height: 50}}
      source={require('./assets/circle-shape-outline.png')}
    />;
      default: return <View/>;
    }
   


  }
  onTilePress=(row,col)=>{
    var value=this.state.gameState[row][col];
    if(value!==0){
      return;
    }
    let currentPlayer=this.state.currentPlayer;
    let arr=this.state.gameState.slice();
    arr[row][col]=currentPlayer;
    this.setState({gameState:arr});
    let nextPlayer = (currentPlayer==1)?-1:1;
    this.setState({currentPlayer:nextPlayer});
    var winner=this.getWinner();
    if(winner==1){
       Alert.alert("PLAYER 1 IS  THE WINNER");
       this.initgame();
    }else if(winner==-1){
      Alert.alert("PLAYER 2 IS  THE WINNER");
      this.initgame();

    }


  }
  getWinner=()=>{
    let sum;
    let numTils=3;
    let arr =this.state.gameState;
    for(var i=0;i<numTils;i++){
      sum=arr[i][0]+arr[i][1]+arr[i][2];
      if(sum==3){
        return 1;

      }
      else if(sum==-3){
        return -1;
      }
    }
    for(var i=0;i<numTils;i++){
      sum=arr[0][i]+arr[1][i]+arr[2][i];
      if(sum==3){
        return 1;

      }
      else if(sum==-3){
        return -1;
      }
    }
    sum=arr[0][0]+arr[1][1]+arr[2][2];
    if(sum==3){
      return 1;

    }
    else if(sum==-3){
      return -1;
    }
    sum=arr[2][0]+arr[1][1]+arr[0][2];
    if(sum==3){
      return 1;

    }
    else if(sum==-3){
      return -1;
    } 
return 0;

  }
  render(){
  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row",}}>
     <TouchableOpacity onPress={() =>this.onTilePress(0,0)} style={[styles.tile,{borderTopWidth:0,borderLeftWidth:0}]}>
     {this.renderIcon(0,0)}
     </TouchableOpacity>
     <TouchableOpacity   onPress={() =>this.onTilePress(0,1)} style={[styles.tile,{borderTopWidth:0}]}>
     {this.renderIcon(0,1)}
     </TouchableOpacity>
     <TouchableOpacity  onPress={() =>this.onTilePress(0,2)} style={[styles.tile,{borderTopWidth:0,borderRightWidth: 0,}]}>
     {this.renderIcon(0,2)}
     </TouchableOpacity>
     </View> 
     <View style={{flexDirection:"row",}}>
     <TouchableOpacity  onPress={() =>this.onTilePress(1,0 )} style={[styles.tile,{borderLeftWidth:0,}]}>
     {this.renderIcon(1,0)}
     </TouchableOpacity>
     <TouchableOpacity  onPress={() =>this.onTilePress(1,1 )} style={[styles.tile,{}]}>
     {this.renderIcon(1,1)}
     </TouchableOpacity>
     <TouchableOpacity  onPress={() =>this.onTilePress(1,2 )} style={[styles.tile,{borderRightWidth:0,}]}>
     {this.renderIcon(1,2)}
     </TouchableOpacity>
     </View>
     <View style={{flexDirection:"row",paddingBottom:40}}>
     <TouchableOpacity  onPress={() =>this.onTilePress(2,0 )} style={[styles.tile,{borderBottomWidth:0,borderLeftWidth:0}]}>
     {this.renderIcon(2,0)}
     </TouchableOpacity>
     <TouchableOpacity  onPress={() =>this.onTilePress(2,1 )} style={[styles.tile,{borderBottomWidth:0}]}>
     {this.renderIcon(2,1)}
     </TouchableOpacity>
     <TouchableOpacity  onPress={() =>this.onTilePress(2,2 )} style={[styles.tile,{borderBottomWidth:0,borderRightWidth: 0,}]}>
     {this.renderIcon(2,2)}
     </TouchableOpacity>
     </View>
     <Button title="New Game" onPress={this.initgame}></Button>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth:5,
    width:100,
    height:100,
    alignItems:"center",
    justifyContent:"center"

    


  },
  tilex:{
    color:"red",
    fontSize:60,
    
  },
  tileo:{
    color:"green",
    fontSize:60,
    
  }
});
