import { useEffect,useMemo,useRef, useState } from "react";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Animated, Easing,Image} from 'react-native';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import i18n from '@/i18n';
import { MAIN_COLOR, MAIN_COLOR_DESACTIVATE } from "../ConfigApp/Colors";

interface LoadSplashScreenProps
{
    activeModal:boolean
}


const startRotationAnimation = (durationMs: number, rotationDegree: Animated.Value): Animated.CompositeAnimation => {

  rotationDegree.setValue(0); // ← IMPORTANTE

  const animation = Animated.loop(Animated.timing(
    rotationDegree,
    {
      toValue: 360,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: true
    }
  ))

  animation.start();
  return animation;


}

export default function ModelLoadSplashScreen(props:LoadSplashScreenProps)
{
  
    const height = 130

    const styles = useMemo(() => StyleSheet.create({
      container: {
        width: height,
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
      },
      progress: {
        width:'100%',
        height:'100%',
        borderRadius:height/2,
        borderWidth:20,
        position: 'absolute',
        borderLeftColor: MAIN_COLOR,
        borderRightColor: MAIN_COLOR,
        borderBottomColor: MAIN_COLOR,
      },
        fotoLogo: {
        width: 150,
        height: 150,
        borderRadius: 60,
        marginBottom: 70
      }
    }), [MAIN_COLOR]);

    const stylesModal = useMemo(() => StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        justifyContent:"center",
        alignContent:"center",
        width:"100%",
        height:"100%",
        margin: 20,
        backgroundColor: '#FFFFFF80',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#FFFFFF80',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
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
    }), [MAIN_COLOR]);


    const { t } = useTranslation();
    
    const [modalVisible, setModalVisible] = useState(false);

    const animRef = useRef<Animated.CompositeAnimation>(undefined);
  
    useEffect(() => {
        setModalVisible(props.activeModal);

        if(animRef.current!=undefined && props.activeModal==false)
        {
          rotationDegree.stopAnimation();
          animRef.current.stop();
        }else{
            rotationDegree.setValue(0); // reiniciamos la animación
            const anim = startRotationAnimation(1000, rotationDegree) //la iniciamos de nuevo
            animRef.current=anim;
        }

    }, [props.activeModal]);

    const rotationDegree = useRef(new Animated.Value(0)).current
    useEffect(() => {
        const anim = startRotationAnimation(1000, rotationDegree)
        animRef.current=anim;

        return () => {
          rotationDegree.stopAnimation();
          anim.stop();
        };

    }, [rotationDegree])

    
      /*useFocusEffect(
        useCallback(() => {
          console.log("Hello, I'm focused!");
          loadDataChats(valCorreoUserencry.current);
          setValueFocused(true);
          return () => {
            setValueFocused(false);
            console.log('This route is now unfocused.');
          };
        }, [])
      )*/

    return(
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={stylesModal.centeredView}>
              <View style={stylesModal.modalView}>
                  
                  <Image accessibilityLabel={t('register.logo.accessibilityLabel')} source={require('@/assets/images/logoappv2.png')} style={styles.fotoLogo} />

                  <View style={styles.container} accessibilityLabel={t("load_splash_screen.progressbar.accessibilityLabel")} accessibilityRole='progressbar' accessible={true}>
                      <Animated.View style={[styles.progress, { borderTopColor:MAIN_COLOR_DESACTIVATE },{
                          transform: [{
                              rotateZ: rotationDegree.interpolate({
                                  inputRange: [0, 360],
                                  outputRange: ['0deg', '360deg']
                              })
                          }]
                      }]}
                      />
                  </View>
              </View>
          </View>
      </Modal>
    );

}

