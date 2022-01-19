import logo from './logo.svg';

import { ListContainer } from './components/bugs/ListContainer';
import './components/bugs/components.css';
import { store } from './redux/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
     <ListContainer />
    </div>
    </Provider>
    
  );
}

export default App;
