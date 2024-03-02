import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ---- Components ----
// import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import About from './components/About';
import Jobcard from './components/Jobcard';
 import Dashboard from './components/Dashboard';
// import Invoice from './components/Invoice';
import Landing from './components/Landing';
import Vehicle from './views/Vehicle';
import Users from './views/Users';
import Employee from './views/Employee';
import Work from './views/Work';
import Delivery from './views/Delivery';
import Feedback from './views/Feedback';
import Stock from './views/Stock';
import Payment from './views/Payment';
import Jobcarddetails from './views/Jobcarddetails';
// import AddEmp from './Utils/AddEmp';
import AddEmp from './components/AddEmp';
import AddParts from './components/AddParts';
import Searchbar from './Utils/Searchbar';
import SearchResult from './Utils/SearchResult';


import Inv2 from './components/Inv2';
import ForgetPass from './components/ForgetPass';
// import Invoice2 from './components/Asdf';
import InvoiceView from './views/InvoiceView';
import InvoiceDetailsView from './views/InvoiceDetailsView';
import Addfeedback from './components/Addfeedback';


// ---- x Components x ----

function App() {
  
  return (
    <div className="App">
      <Router>
        {/* <Landing/> */}
          <Routes>   
            <Route path='/' element={<Landing/>} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path='/about' element={<About />} />
            <Route path='/jobcard' element={<Jobcard />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/invoice' element={<Inv2 />} />
            <Route path='/forgetpassword' element={ <ForgetPass/> } />

            {/* <Route path='/inv' element={ <Inv/> } />
            <Route path='/inv2' element={ <Inv2/> } /> */}

            {/* views */}
            <Route path='/vehicleview' element={<Vehicle/>} /> 
            <Route path='/usersview' element={<Users/>} />
            <Route path='/empview' element={<Employee/>} />
            <Route path='/workview' element={<Work/>} />
            <Route path='/deliveryview' element={<Delivery/>} />
            <Route path='/feedbackview' element={<Feedback/>} />
            <Route path='/stockview' element={<Stock/>} />
            <Route path='/paymentview' element={<Payment/>} /> 
            <Route path='/jobcardview' element={<Jobcarddetails/>} /> 
            {/* <Route path='/addemp' element={<AddEmp/>} />  */}
            <Route path='/searchbar' element={<Searchbar/>}/>
            <Route path='/searchResult' element={<SearchResult/>} />
            <Route path='/invoiceview' element={ <InvoiceView/> } />
            <Route path='/invoicedetailsview' element={ <InvoiceDetailsView/> } />

            <Route path='/addemp' element={<AddEmp/>} />
            <Route path='/addparts' element={<AddParts/>} />
            <Route path='/addfeedback' element={ <Addfeedback/> } />

            {/* <Route path='/asdf' element={ <Invoice2/> } /> */}





          </Routes>
      </Router>
    </div>
  );
}

export default App;
