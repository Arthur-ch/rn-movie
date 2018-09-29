import {
  createStackNavigator,
} from 'react-navigation';
import Profile from './pages/Profile';
import Index from './pages/Index';
import List from './pages/List';
import Detail from './pages/Detail';

const App = createStackNavigator({
  index: {
    screen: Index,
    navigationOptions: {
      title: 'Movies Recommand'
    }
  },
  profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile'
    }
  },
  list: {
    screen: List,
    navigationOptions: {
      title: 'Movies List'
    }
  },
  detail: {
    screen: Detail,
    navigationOptions: {
      title: 'Movies Detail'
    }
  }
},/*  {
  initialRouteName: 'index',
  mode: 'modal',
  headerMode: 'float'
} */);

export default App;