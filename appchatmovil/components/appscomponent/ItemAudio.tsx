import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet,Image } from 'react-native';
import { useEffect, useRef, useState } from "react";
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { convertorTiempo } from "../utils/CodeUtils";
import '@/i18n';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";

interface PropsRecursoAudio{
    uri_recurso?:string,
}

export default function ItemAudio(props:PropsRecursoAudio)
{
    const { t } = useTranslation();

    const [valueControl, setValueControl] = useState(false);
    const [valueTimeAudio, setValueAudioControl] = useState<string[]>([]);
    //
    const [valueDuracionTotal, setValueDuracionTotal] = useState<number>(0);
    const valueIncrementoData = useRef<number>(0); //puede ser usestate pero nos aprovechamos de la actualizacion de setValueAudioControl 
    const valueSoundData = useRef<Audio.Sound>(undefined);
    const valueInterval = useRef<NodeJS.Timeout>();
    //const milisegundoAudioActual = useRef<number>();
    const objectSoundAudio = useRef<Audio.Sound|undefined>();
    const loadAudio = useRef<boolean>(true);


    async function load_audio()
    {
        if(objectSoundAudio.current){
            await objectSoundAudio.current.unloadAsync();
        }
        console.log("url nueva: "+props.uri_recurso);
        const { sound,status } = await Audio.Sound.createAsync(
          //require('@/assets/sounds/57s.mp3') // Ruta del archivo de audio en la carpeta 'assets'
          { uri: props.uri_recurso!=undefined?props.uri_recurso:'' },
        );
        objectSoundAudio.current=sound;

        let estado=await objectSoundAudio.current.getStatusAsync();

        await objectSoundAudio.current.setVolumeAsync(1);
        await objectSoundAudio.current.setPositionAsync(0);
        valueSoundData.current=objectSoundAudio.current;

        //await sound.playAsync(); // Reproducir el audio

        if (estado.isLoaded && estado.durationMillis!=undefined) {
            let duracion_total=estado.durationMillis;
            setValueAudioControl(convertorTiempo(duracion_total));
            setValueDuracionTotal(duracion_total)

            objectSoundAudio.current.setOnPlaybackStatusUpdate((statusData) => {
                
                if (statusData.isLoaded && statusData.isPlaying) {
                    console.log(statusData);
                    console.log("Posición actual:", statusData.positionMillis);
                    //milisegundoAudioActual.current=statusData.positionMillis;
                    console.log("AUDIO FINALIZADO?"+statusData.didJustFinish);
    
                    //para cuando el audio finaliza
                    if((duracion_total-statusData.positionMillis)<=700){
                        console.log("AUDIO FINALIZADO");
                        valueSoundData.current?.stopAsync();
                        //milisegundoAudioActual.current=0;
                        setValueControl(false);
                        setValueAudioControl(convertorTiempo(duracion_total));
                        valueIncrementoData.current=0;
                        clearInterval(valueInterval.current) //limpia cualquier intervalo activo  
                    }
                }
            });
        }
    }

    const playSound = async () => {
        
        if(loadAudio.current){
            await load_audio();
            loadAudio.current=false;
        }

        console.log("se esta ejecutando la funcion playSound");
        if(!objectSoundAudio.current) {
            console.log("objectSoundAudio.current es undefined o nulo");
            return; //por si es undefined
        }
       
        let estado=await objectSoundAudio.current.getStatusAsync();
        console.log(estado);
        if (estado.isLoaded && estado.durationMillis!=undefined) {
            
            await valueSoundData.current?.playAsync();    
            let duracion_total=estado.durationMillis;
            console.log("que nota= "+estado);
            console.log(estado);

            let valueImcremento=valueIncrementoData.current;

            const intervalaudio = setInterval(() => 
                {
                    console.log(`El intervalo no se detiene la uri es ${props.uri_recurso}`);
                    setValueAudioControl(convertorTiempo(duracion_total-valueImcremento));
                    valueImcremento+=1000;
                    valueIncrementoData.current=valueImcremento;
                }, 1000);

            valueInterval.current=intervalaudio;

        }else{
            console.log("ha ocurrido un error en la carga del audio= "+estado.isLoaded);
        }
    };

    useEffect(() => {
        //load_audio();
        reset();
        loadAudio.current=true;

        return () => {
           reset();
        };

    }, [props.uri_recurso]);


    function reset()
    {
        if (objectSoundAudio.current) {
            console.log("Descargando audio antiguo...");
            objectSoundAudio.current.unloadAsync();
            objectSoundAudio.current = undefined;
        }
        clearInterval(valueInterval.current);
    }


    async function handlerClickControl(e: GestureResponderEvent)
    {
        clearInterval(valueInterval.current) //limpia cualquier intervalo activo  

        if(valueControl){ //pausa la reproduccion
            console.log("inactivo triangulo");
            setValueControl(false);
            valueSoundData.current?.pauseAsync(); //pausa el sonido
        }else{
            setValueControl(true);
            playSound();
        }
    }

    function handlerChangedSlider(e:number)
    {
        console.log("duracion= "+ (valueDuracionTotal));
        console.log("valueImcremento= "+ (valueIncrementoData.current));
        console.log(e);
        if(valueSoundData.current!=undefined)
        {
            valueSoundData.current.setPositionAsync(e);
            clearInterval(valueInterval.current);

            let milisegundo_actual=valueDuracionTotal-e;
            console.log("Milisegundo actual= "+milisegundo_actual);
            let data_informacion=convertorTiempo(milisegundo_actual)
            setValueAudioControl(data_informacion);
            console.log(data_informacion)

            //constante de cuanto milisegundos hay un un segundo
            const milisegundosXsegundo=1000;
            let valueImcremento=(Math.floor(valueDuracionTotal/milisegundosXsegundo)-Number(data_informacion[2]))*1000;
            console.log("valor incremento calculado= "+valueImcremento);
            console.log("valueImcremento= "+valueImcremento)
            console.log("valueImcremento= ",(valueDuracionTotal-valueImcremento))
            console.log((valueDuracionTotal))
            console.log((valueDuracionTotal-valueImcremento))

            valueImcremento+=1000;
            valueIncrementoData.current=valueImcremento
            if(valueControl)
                playSound();
        }
    }

    return(
        <View style={styles.container_audio} accessibilityLabel={t("item_audio.container_audio.accessibilityLabel")} accessibilityRole="text" accessible={true}>
            <View accessibilityLabel={t("item_audio.controls.container_time_bar",{time:valueTimeAudio[3]})} accessibilityRole="text" accessible={true} style={styles.barra_tiempo_container}>
                <Slider
                accessibilityLabel={t("item_audio.controls.time_bar",{time:valueTimeAudio[3]})} accessibilityRole="text" accessible={true}
                style={{width: "100%", height: "100%"}}
                minimumValue={0}
                maximumValue={valueDuracionTotal}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onSlidingComplete={handlerChangedSlider}
                value={valueIncrementoData.current}
                />
            </View>
            <View accessibilityLabel={valueControl?t("item_audio.controls.button_audio_deactivate"):t("item_audio.controls.button_audio_active")} accessibilityRole="text" accessible={true} style={styles.control}>
                <TouchableOpacity disabled={props.uri_recurso==''?true:false} /*accessibilityLabel={valueControl?"Pausar audio":"Reproducir audio"} accessibilityRole="button" accessible={true}*/ onPress={handlerClickControl} style={{width:"100%",height:"100%",backgroundColor:"transparent",borderWidth:0}}>
                    {valueControl?<Image source={require(`@/assets/images/pause.png`)} style={styles.logos} resizeMode="contain"></Image>: <Image source={require(`@/assets/images/play.png`)} style={styles.logos} resizeMode="contain" ></Image>}
                </TouchableOpacity>
            </View>
            <View /*accessibilityLabel={t("item_audio.controls.current_time_audio",{time:valueTimeAudio[3]})} accessibilityRole="text" accessible={true}*/ style={{left:25,bottom:0,position:"absolute"}}>
                <Text style={{fontSize:8}}>{valueTimeAudio[3]}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container_audio:{
        borderRadius: 30, 
        borderWidth: .5,          
        borderColor: '#000',
        flexDirection:"row",
        width:250,
        height:50
    },
    barra_tiempo_container:{
        width:"75%",
        //borderWidth: 1,          
        //borderColor: 'red',
        justifyContent:"center",
        alignItems:"center"
    }
    ,control:{
        width:"25%",
        alignItems:"center",
        justifyContent:"center",
        //borderWidth: 1,          
        //borderColor: 'green',
    },
    logos:{
        width:"100%",
        height:"100%"
    }
});