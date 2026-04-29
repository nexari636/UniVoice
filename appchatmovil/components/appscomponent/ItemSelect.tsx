import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList
} from 'react-native';
import ISelectOptions from '../Interfaces/ISelectOptions';
import { MAIN_COLOR } from '../ConfigApp/Colors';
import { changeConfig, ProfileMenu } from '../ConfigApp/Config';

interface SelectProps
{
  opciones:ISelectOptions[],
  opcioninit:string,
  onSelectChange: (value: string) => void;
  labelmain:string,
  accessibilityLabelmain:string,
  accessibilityLabelselect:string,
  accessibilityLabeloptions:string,
  opcionNA:string,
  isConfigChange?:boolean
}

export default function ItemSelect(props:SelectProps)
{

    const styles = useMemo(() => StyleSheet.create({
      container: {
        marginBottom: 0,
      },
      label: {
        fontSize:ProfileMenu.label_select_font_size,
        fontWeight: 'bold',
        marginBottom: 3,
      },
      selector: {
        borderColor: '#9A9D9A',
        borderWidth: 1,
        //borderColor: '#ccc',
        //borderColor: '#000',
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        width:"100%",
        height:48
      },
      selectorTexto: {
        fontSize:ProfileMenu.text_selected_font_size,
        fontWeight:ProfileMenu.text_selected_bold,
        color: '#333'
      },
      overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)'
      },
      modalBox: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        width: 250
      },
      opcion: {
        height:48,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc'
      }
    }), [changeConfig]);


    const [modalVisible, setModalVisible] = useState(false);
    const [Valueoption, setOption] = useState(props.opcioninit);

    console.log("opcion inicial es: "+props.opcioninit);

    useEffect(() => {
        setOption(props.opcioninit)
    }, [props.opcioninit]);
    
    /*const opciones = [
        { label: 'Visual', value: 'visual' },
        { label: 'Auditiva', value: 'auditiva' },
        { label: 'Motora', value: 'motora' },
        { label: 'Intelectual', value: 'intelectual' },
        { label: 'Ninguna', value: 'ninguna' },
    ];*/

    const seleccionar = (valor:string) => {
        setOption(valor);
        setModalVisible(false);
        props.onSelectChange(valor);
    };

    return (
      <View style={styles.container} accessible={true} accessibilityLabel={props.accessibilityLabelmain} accessibilityRole="text">
        {props.labelmain&&<Text style={styles.label}>{props.labelmain}</Text>}
        <TouchableOpacity
          style={styles.selector}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectorTexto} accessible={false} accessibilityLabel={`${props.accessibilityLabelselect} ${Valueoption ? props.opciones.find(o => o.value === Valueoption)?.label : props.opcionNA}`} accessibilityRole="text">
            {Valueoption ? props.opciones.find(o => o.value === Valueoption)?.label : props.opcionNA}
          </Text>
        </TouchableOpacity>

        {/* Modal flotante con opciones */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <TouchableOpacity style={styles.overlay} onPress={() => setModalVisible(false)}>
            <View style={styles.modalBox}>
              {props.opciones.map((op) => (
                <TouchableOpacity accessible={true} accessibilityLabel={`${props.accessibilityLabeloptions} ${op.label}`} accessibilityRole="text" key={op.value} style={styles.opcion} onPress={() => seleccionar(op.value)}>
                  <Text style={styles.selectorTexto}>{op.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );

}

