import { Navbar } from "./components/Navbar"
import { Routes , Route } from "react-router-dom"
import  Home  from "./pages/Home"
import  Login  from "./pages/Login"
import  SignUp  from "./pages/SignUp"
import  Account  from "./pages/Account"


function App() {
 

  return (
   
    <>
    
    <Navbar/>
      

    
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/account" element={<Account/>} />
    </Routes>
    </>
    
  
  )
}

export default App
