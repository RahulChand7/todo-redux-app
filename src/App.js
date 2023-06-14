import logo from './logo.svg';
import './App.css';
import { Container } from 'react-bootstrap';
import Todos from './Components/Todos';
import { Provider } from 'react-redux';
import store from './Redux/store'

function App() {
  return (
    <Provider store={store}>
      <Container>
        <Todos/>
      </Container>
    </Provider>
    
  );
}

export default App;
