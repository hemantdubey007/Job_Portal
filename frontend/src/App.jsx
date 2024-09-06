import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompnayCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'

function App() {
  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },

    {
      path:'/login',
      element:<Login/>
    },

    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/jobs',
      element:<Jobs/>
    },
    {
      path:'/description/:id',
      element:<JobDescription/>
    },
    {
      path:'/browse',
      element:<Browse/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },

    //For Admin role

    {
      path:'/admin/companies',
      element:<Companies/>
    },

    {
      path:'/admin/companies/create',
      element:<CompnayCreate/>
    },

    {
      path:'/admin/companies/:id',
      element:<CompanySetup/>
    },

    {
      path:'/admin/jobs',
      element:<AdminJobs/>
    }
  ])
  
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App