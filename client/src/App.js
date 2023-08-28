import react, {Fragment} from "react"
import './App.css';

// import Componenets
import InputTodo from './components/InputTodo.js'
import ListTodos from './components/ListTodos'

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>

    </Fragment>
  )
}

export default App;
