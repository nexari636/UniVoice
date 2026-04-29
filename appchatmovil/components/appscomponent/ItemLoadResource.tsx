import { useEffect, useMemo, useRef } from "react";
import { View,StyleSheet, Animated, Easing } from "react-native";
import { useTranslation } from 'react-i18next';
import '@/i18n';
import i18n from '@/i18n';
import { MAIN_COLOR, MAIN_COLOR_DESACTIVATE } from "../ConfigApp/Colors";

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

export default function ItemLoadResource()
{

    const height = 24

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
        borderWidth:4,
        position: 'absolute',
        borderLeftColor: /*'#90CAF9'*/MAIN_COLOR,
        borderRightColor: /*'#90CAF9'*/MAIN_COLOR,
        borderBottomColor: /*'#90CAF9'*/MAIN_COLOR,
      }
    }), [MAIN_COLOR]);

    const { t } = useTranslation();
    const rotationDegree = useRef(new Animated.Value(0)).current

    useEffect(() => {
      const anim =  startRotationAnimation(1000, rotationDegree)

      return () => {
        rotationDegree.stopAnimation();
        anim.stop();
      };

    }, [rotationDegree])

    return (
        <View style={styles.container} accessibilityLabel={t("load_splash_screen.progressbar.accessibilityLabel")} accessibilityRole='progressbar' accessible={true}>
            <Animated.View style={[styles.progress, { /*borderTopColor:"#007BFC"*/borderTopColor:MAIN_COLOR_DESACTIVATE },{
                transform: [{
                    rotateZ: rotationDegree.interpolate({
                        inputRange: [0, 360],
                        outputRange: ['0deg', '360deg']
                    })
                }]
            }]}
            />
        </View>
    )
}


