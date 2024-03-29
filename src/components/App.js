import '../styles/App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


// routes
const router = createBrowserRouter([
  {
    path : '/',
    element : <div>Root Element</div>
  },

])


function App() {
  return (
   <RouterProvider router={router} />
  );
}

export default App;
