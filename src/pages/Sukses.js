import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/constants'

//----------------------------------------------------------------------------------------------------------------------

export default class Sukses extends Component {

  componentDidMount() {

    axios
      .get(API_URL + "keranjangs")
      .then((res) => {

        const keranjangs = res.data;

        keranjangs.map((item) => {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            })
        })

      })
      .catch(err => {
        console.log(err);
      })
  }

  submit = () => {

    window.location.href = "/"

  }

  //----------------------------------------------------------------------------------------------------------------------

  render() {

    return (

      <div className="mt-4 text-center">

        <Image src="Images/sukses.png" width="500" />

        <h2>Sukses</h2>

        <p>Terimakasih sudah memesan</p>

        <Button
          variant="success"
          as={Link} to="/"
          onClick={() => this.submit()}>
          Kembali
        </Button>

      </div>
    )
  }
}
