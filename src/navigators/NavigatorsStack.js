import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home.js';
import DrawerNavigator from './NavigatorsDrawer.js';
import HomeAppliances from '../views/HomeAppliances.js';
import TechsPage from '../views/TechsPage.js';
import GamersPage from '../views/GamersPage.js';
import ProductDetails from '../views/ProductDetails.js';
const Stack = createStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false
           }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="RegisterScreen" component={DrawerNavigator} />
            <Stack.Screen name="Home&Appliances" component={HomeAppliances} />
            <Stack.Screen name="TechsPage" component={TechsPage} />
            <Stack.Screen name="GamersPage" component={GamersPage}/>
            <Stack.Screen name="Detail" component={ProductDetails}/>
        </Stack.Navigator>
    )
}
export default StackNavigator