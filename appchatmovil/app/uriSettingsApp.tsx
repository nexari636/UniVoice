import SettingsApp from "@/components/screens/SettingsApp";
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function uriSettingsApp()
{
    return(
        <SafeAreaProvider><SettingsApp/></SafeAreaProvider>
    );
}
