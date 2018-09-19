import {
  createStackNavigator,
} from 'react-navigation';
import ProfileScreen from './pages/ProfileScreen';
import IndexScreen from './pages/IndexScreen';
import HomeScreen from './pages/HomeScreen';

const App = createStackNavigator({
  Index: { screen: IndexScreen },
  Profile: { screen: ProfileScreen },
  Home: { screen: HomeScreen },
});

export default App;