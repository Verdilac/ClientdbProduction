import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import { UserAuthContextProvider } from "./Util/UserAuthContext";




function App() {
  return (

    <Router>

      <UserAuthContextProvider>
        <Routes>

          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />


        </Routes>

      </UserAuthContextProvider>


      <div className="App">

      </div>
    </Router>

  );
}

export default App;
