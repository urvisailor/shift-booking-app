import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MyShifts from "../screens/myshifts";
import AvailableShifts from "../screens/availableshifts";
import { COLORS } from "../constants/colors";
import { getFontSize, isIOS } from "../constants/utils";
import { TEXTS } from "../constants/texts";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            activeColor={COLORS.BLUE}
            inactiveColor={COLORS.LIGHT_GREY}
            screenOptions={{
                tabBarIcon: () => null,
                headerShown: false,
                tabBarLabelStyle: { fontSize: getFontSize(15), position: 'absolute', paddingBottom: isIOS ? 10 : 15, fontWeight: 'bold' }
            }}>
            <Tab.Screen name={TEXTS.navigation.route.MYSHIFTS} component={MyShifts} />
            <Tab.Screen name={TEXTS.navigation.route.AVAILSHIFTS} component={AvailableShifts} />
        </Tab.Navigator>
    );
};

export default TabNavigator