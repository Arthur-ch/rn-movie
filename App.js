import {
  createStackNavigator,
} from 'react-navigation';
import Profile from './pages/Profile';
import Index from './pages/Index';
import List from './pages/List';

const App = createStackNavigator({
  Index: {
    screen: Index,
    navigationOptions: {
      title: 'Movies Recommand'
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile'
    }
  },
  List: {
    screen: List,
    navigationOptions: {
      title: 'Movies List'
    }
  }
}, {
  initialRouteName: 'Index',
  mode: 'modal',
  headerMode: 'float'
});

export default App;