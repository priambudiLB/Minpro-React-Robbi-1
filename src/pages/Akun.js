import React from 'react'

import Index from '../components/Akun/index';

// import Tabel from '../components/Akun/Table';

// import { Table } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

//-----------------------------------------------------

function Akun() {

  return (

    <div className="App">

      { ((localStorage.getItem('accessToken'))) ? <Index /> : <h2>Unauthorized</h2> }

    </div>
  );
}

export default Akun;