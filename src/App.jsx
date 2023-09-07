import { useState } from 'react'
import {BrowserRouter as Router,Route,Link, Routes } from 'react-router-dom' 
import AddBook from './pages/AddBook';
import Allbooks from "./pages/AllBooks";
import UpdateBook from "./pages/UpdateBook";
import AddAuthor from './pages/AddAuthor';
import AllAuthors from './pages/AllAuthors';
import UpdateAuthor from './pages/UpdateAuthor';


import './App.css'
import Layout from "./component/shared/Layout";


function App() {

  return (
    <Layout>      
<Router>

<nav className="navbar navbar-expand-md">
  <div className="container-fluid">
    <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul className="navbar-nav mx-auto px-5">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white bg-danger">
            <b>All Book Detail</b>
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/all-authors" className="nav-link text-white bg-danger">
            <b>All Author Detail</b>
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

   <Routes>
        <Route path="/" element={<Allbooks />}></Route>
        <Route path="/add-book" element={<AddBook />}></Route>
        <Route path="/update-books/:id" element={<UpdateBook />}></Route>
{/* auhtor detail page */}
        <Route path="/all-authors" element={<AllAuthors />}></Route>
        <Route path="/add-author" element={<AddAuthor/>}></Route>
        <Route path="/update-author/:id" element={<UpdateAuthor />}></Route>


      </Routes>
      </Router>
    </Layout>
  )
}

export default App
