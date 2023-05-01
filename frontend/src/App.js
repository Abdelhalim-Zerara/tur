import './assets/styles/App.css';
import BookingForm from './components/BookingForm'
import AuthForm from './components/AuthForm'
import Dashboard from './components/Dashboard'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import NotFound from './components/NotFound';
import Filler from './components/Filler';
import AccountProvider from './providers/AccountProvider';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
        <Route  path="/booking/:id" element={<BookingForm/>} />
        <Route  path="/" element={<AuthForm/>} />
        <Route  path="/account" element={<AccountProvider/>}>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="about" element={<Filler/>}/> 
          <Route path="contact" element={<Filler/>}/> 
          <Route path=""element={<Navigate to="/account/dashboard" replace={true} />}/>
        </Route>
        <Route path='*' exact={true} element={<NotFound/>} />
    </Route>
  )
)


function App() {
  return (
    <div>
      <RouterProvider router={router} />
     </div>
  );
}

export default App;
