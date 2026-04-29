
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { MAIN_COLOR } from "../ConfigApp/Colors";
import { useTranslation } from 'react-i18next';
import '@/i18n';
import i18n from '@/i18n';
import { ConfigMenu } from "../ConfigApp/Config";

interface CheckboxProps{
    active:boolean;
    textControl:string,
    onCheckChange: (value: boolean) => void;
    containerAccessibilityLabel:string,
    isConfigChange?:boolean
}

export default function ItemCheckBox(props:CheckboxProps)
{
    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 16,
            marginVertical: 10,
        },
        section: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        paragraph: {
            width:150,
            textAlignVertical: "center",
            fontSize: ConfigMenu.chk_font_size,
            fontWeight:ConfigMenu.chk_bold,
            color:"#000",
        },
        checkbox: {
            width:48,
            height:48,
            margin: 3,
        },
    }), [MAIN_COLOR,props.isConfigChange]);


    const { t } = useTranslation();

    const [isChecked, setChecked] = useState(props.active);

    useEffect(() => {
        setChecked(props.active);
    }, [props.active])

    function handleChangeState(value: boolean)
    {
        console.log(value?"activo":"desactivo");
        setChecked(value);
        props.onCheckChange(value);
    }

    return (
        <View style={styles.container} accessible={true} accessibilityLabel={props.containerAccessibilityLabel+" "+props.textControl} accessibilityRole="text">
            <View style={styles.section}>
                <Checkbox accessible={true} accessibilityLabel={isChecked?t("item_check.active"):t("item_check.disabled")} accessibilityRole="text" style={styles.checkbox} value={isChecked} onValueChange={handleChangeState}   />
                <Text style={styles.paragraph}>{props.textControl}</Text>
            </View>
        </View>
    );
}
