import './App.css'
import { Navbar } from "./components/Navbar"
import { Routes , Route } from "react-router-dom"
import  Home  from "./pages/Home"
import  Login  from "./pages/Login"
import  SignUp  from "./pages/SignUp"
import  Account  from "./pages/Account"
import BookDetails from "./pages/BookDetails"
import Payment from './pages/Payment'
import Footer from './components/Footer'

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
      <Route path="/payment/:id?" element={<Payment/>}/>
    </Routes>
    <Footer/>

    </>
    
  
  )
}

export default App
