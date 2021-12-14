import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './src/screens/MainScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen'
import SearchScreen from './src/screens/SearchScreen'

const stackNavigator = createStackNavigator({
  Main: MainScreen,
  MovieDetails: MovieDetailsScreen,
  Search: SearchScreen
})

const App = createAppContainer(stackNavigator)

export default App;

