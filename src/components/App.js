import '../styles/App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// import components
import Main from './Main';
import CitizenshipTest from './CitizenshipTest';
import Result from './Result';
import { getDataFromDB } from '../util/dataFetcher';

// routes
const router = createBrowserRouter([
  {
    path : '/',
    element : <Main/>
  },
  {
    path : '/citizenshiptest',
    element : <CitizenshipTest/>
  },
  {
    path : '/result',
    element : <Result/>
  }
])


function App() {
  return (
   <RouterProvider router={router} />
  );
}

export default App;
