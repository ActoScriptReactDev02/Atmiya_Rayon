import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RNContainer, RNImage, RNStyles, RNText } from '../../common'
import RNHeader from '../../common/RNHeader'
import { Colors, FontFamily, FontSize, hp, normalize, wp } from '../../theme'
import FetchMethod from '../../api/FetchMethod'
import LottieView from 'lottie-react-native'
import { ImageViewerModal } from '../../components'

const DeliveryStatus = ({route}) => {
    const [data,setdata] = useState({});
    const [isLoading, setisLoading] = useState(false)
    const OrderUniqueId = route.params.OrderUniqueId
    const [imagevisible, setimagevisible] = useState(false);
    const [selectimage, setselectimage] = useState('')

    useEffect(() => {
        deliveryStatusgetapi()
    },[OrderUniqueId])

    const deliveryStatusgetapi = async () => {
   try{
    setisLoading(true)
    const response = await FetchMethod.GET({
        EndPoint:`Order/GetDeliverdInvoices?OrderId=${OrderUniqueId}`
    })
    
    if(response.ResponseCode == 0){
        if(response.Data != null){
            setdata(response.Data)
        }
    } setisLoading(false)
   }catch(error){
    setisLoading(false);
    setdata({})
   // console.log('deliveryStatusgetapi error --->', error);
    
   }
    }
    

    const ImageContainer = ({title,imageuri}) => {
   const hasImage = imageuri && imageuri !== '' && imageuri !== null

        return(
            <Pressable disabled={!hasImage} onPress={() => handleimage(imageuri)} style={styles.imagesontinerstyle}>
                <View style={styles.imagewrapstyle}>
                    {isLoading ?  <ActivityIndicator color={Colors.Orange} size={'large'}/>
               : hasImage ?  <RNImage ImageUri={imageuri} style={{...RNStyles.image100}}/> : 
                <View style={{paddingBottom:hp(2)}}>
                    <LottieView source={require('../../assets/Lottie/NotFound.json')}loop autoPlay style={{height:wp(35), width:wp(35)}}/>
                    <RNText align={'center'} color={Colors.Orange}  size={FontSize.font11} children={'No image available'}/>
             </View>}
                </View>
                <View style={styles.labelContainer}>
                    <RNText children={title} style={styles.labelText}/>
                </View>
            </Pressable>
        )
    }   

    const handleimage = (uri) => {
        setselectimage(uri),
        setimagevisible(true)
    }
    
  return (
    <RNContainer >
        <RNHeader title={'Delivery Status'}/>
        {Object.keys(data).length >0 ?  
        <ScrollView bounces={false}>
        <ImageContainer title={'ORDER'} imageuri={data.OrderDeliveryImage}/>
        <ImageContainer title={'INVOICE'} imageuri={data.InvoiceDocument}/>
        <ImageContainer title={'TRACKER'} imageuri={data.OrderTakerImage}/>
        </ScrollView> :
        <View style={{...RNStyles.flexCenter}}>
          <LottieView source={require('../../assets/Lottie/NotFound.json')}loop autoPlay style={{height:wp(40), width:wp(40)}}/>
          <RNText color={Colors.Orange} family={FontFamily.SemiBold} children={'No data found'}/>
        </View>
            }
        {imagevisible && <ImageViewerModal onRequestClose={() =>{ setimagevisible(false), setselectimage('')}} 
        visible={imagevisible} imageURL={selectimage}/>}
    </RNContainer>
  )
}

export default DeliveryStatus

const styles = StyleSheet.create({
    imagesontinerstyle:{
         borderRadius:normalize(10),
        overflow:'hidden',
        borderWidth:normalize(1),
        borderColor:Colors.Orange,
        marginBottom:hp(2),
    },
    imagewrapstyle:{
        height:hp(20),
       // width:wp(100),
        backgroundColor:Colors.DarkBackgroundColor + '50',
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    labelContainer:{
        backgroundColor:Colors.Orange,
        paddingVertical:hp(1),
        alignItems:'center',
    },
    labelText:{
        fontSize:FontSize.font16,
        fontFamily:FontFamily.SemiBold,
        color:Colors.White,
        textTransform:'capitalize'
    }
})