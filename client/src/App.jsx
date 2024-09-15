import './App.css'
import { Navbar } from "./components/Navbar"
import { Routes , Route } from "react-router-dom"
import  Home  from "./pages/Home"
import  Login  from "./pages/Login"
import  SignUp  from "./pages/SignUp"
import  Account  from "./pages/Account"
import BookDetails from "./pages/BookDetails"

function App() {
  const isUserSignIn = !!localStorage.getItem("token")

  return (
   
    <>
    
    <Navbar/>    
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
     {isUserSignIn &&  <Route path="/account" element={<Account/>} /> }
      <Route path="/book/bookdetails/:id" element={<BookDetails/>}/>
    </Routes>
    </>
    
  
  )
}

export default App
