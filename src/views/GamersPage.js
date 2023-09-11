import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity, Button, TouchableHighlight, ScrollView} from 'react-native'
import React from 'react'
import Gamers from '../../assets/gamers.jpg'
import AntDesign from "react-native-vector-icons/AntDesign";
import productsActions from '../../redux/actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useState , useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GamersPage = (props) => {
  const dispatch=useDispatch()
  const [currentPage, setCurrentPage] = useState(
    parseInt(AsyncStorage.getItem('currentPageGamers')) || 1 //le digo que mi estado inicial sea 1 o que sea el numero almacenado en el local storage
  );
  const gamers = useSelector((store) => store.products.gamers);
  const datos=gamers.products
  const page=currentPage //page va a ser el estado dinamico del current page para hacer referencia a que pagina vamos a navegar
  useEffect(() => {
  AsyncStorage.setItem('currentPageGamers', currentPage);
  dispatch(productsActions.read_pag_gamers(page)) //le vamos a dar un parametro que indica la pagina (page)
  },[page ]);
  function handleNext(){
    setCurrentPage(currentPage + 1)
   }
  function handlePrev(){
  setCurrentPage(currentPage - 1)
  }
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
     <View style={styles.navbar}>
            <View style={styles.nav1}>
            <TouchableOpacity onPress={()=>props.navigation.toggleDrawer()}>
            <AntDesign name="bars" style={styles.menu}/>
            </TouchableOpacity>
            <AntDesign name="shoppingcart" style={styles.logo} />
        </View>
    </View>
    <Image source={Gamers} style={styles.banner}/>
    <Text style={styles.title}>Gamers</Text>
   <View style={styles.cont_buton}>
    <TouchableHighlight onPress={handlePrev} disabled={gamers.prevPage === null} style={styles.boton}><Text style={styles.arrow}>Prev page</Text></TouchableHighlight>
    <Text>Page{currentPage}</Text>
    <TouchableHighlight onPress={handleNext} disabled={gamers.nextPage === null} style={styles.boton}><Text style={styles.arrow}>Next page</Text></TouchableHighlight>
   </View>
   <View style={styles.cont_images}>
   {datos?.map((element) => (
   <TouchableHighlight >
    <View style={styles.card}>
    <Image source={{ uri: element.cover_photo[0] }} style={styles.productImage} key={element._id}/>
    <Text>{element.title}</Text>
    <Text>USD${element.price}</Text>
    </View>
    
  </TouchableHighlight>
  ))}
  </View>
  <View style={styles.cont_buton}>
    <TouchableHighlight onPress={handlePrev} disabled={gamers.prevPage === null} style={styles.boton}><Text style={styles.arrow}>Prev page</Text></TouchableHighlight>
    <Text>Page{currentPage}</Text>
    <TouchableHighlight onPress={handleNext} disabled={ gamers.nextPage === null} style={styles.boton}><Text>Next page</Text></TouchableHighlight>
   </View>
  </View>
  </ScrollView>
    )
  }
  

export default GamersPage

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white"
  },
  navbar: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  backgroundColor:'#007BFF'
},
nav1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 10,
},
logo: {
    width: 55,
    height: 55,
    fontSize: 40,
    color: 'white'
},
menu: {
    width: 55,
    height: 55,
    fontSize: 40,
    color: 'white'
},
banner:{
width:410,
height:135,
objectFit:'cover'
},
title:{
  color:'gray',
  fontSize:20,
  textAlign:'center'
},
productImage:{
  width:110,
  height:80,
  objectFit:'contain'
},
boton:{
  width:70,
  height:30,
  backgroundColor:'#007BFF',
  borderRadius:5,
  padding:2,
  justifyContent:'center',
  alignItems:'center'
},
cont_buton:{
  flexDirection:"row",
  padding:20,
  justifyContent:"center",
  gap:20
},
arrow:{
color:'white'
},
cont_images:{
flexDirection:"row",
flexWrap:"wrap",
gap:20,
justifyContent:'center'
},
card:{
  flexDirection:'column',
  justifyContent:'center',
  textAlign:'center',
  padding:8,
  alignItems:'center',
  backgroundColor:'white',
  height:210,
  borderRadius:10,
  borderColor:'gray',
  borderStyle:'solid',
  borderWidth:1,
  width:180,
},
scrollContainer: {
  flexGrow: 1,
  backgroundColor: 'white', // Ajusta el color de fondo según tus necesidades
},
})