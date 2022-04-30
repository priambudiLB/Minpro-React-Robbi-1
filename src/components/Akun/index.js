import axios from 'axios'
import React, { Component } from 'react'
import Tabel from './Table'
import Formulir from './Formulir'
import { API_URL } from './constants'
import swal from 'sweetalert';

//------------------------------------------------------------------------------

export default class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            akuns: [],
            name: "",
            email: "",
            Password: "",
            address: "",
            join_date: "",
            phone: "",
            id: "",
        }
    }

    //------------------------------------------------------------------------------

    componentDidMount() {

        axios.get(API_URL + 'users')
            .then(res => {

                const akuns = res.data;
                this.setState({ akuns });
            })
            .catch(err => {
                console.log(err)
            });
    }

    // CRUD CREATE ---------------------------------------------------------------

    handleChange = (event) => {

        console.log(event)

        this.setState({

            [event.target.name]: event.target.value

        })
    }

    // CRUD CREATE DAN EDIT -------------------------------------------------------

    handleSubmit = (event) => {

        event.preventDefault();

        const { id, name, email, password, address, join_date, phone } = this.state

        const data = {
            id,
            name,
            email,
            password,
            address,
            join_date,
            phone
        }

        axios
            .post(API_URL + "users/", data)
            .then((res) => {

                // console.log(res)

                const { id, name, email, password, address, join_date, phone } = res.data


                this.setState({

                    akuns: [...this.state.akuns,
                    {
                        name: name,
                        email: email,
                        password: password,
                        address: address,
                        join_date: join_date,
                        phone: phone,
                        id: id
                    }],

                    name: "",
                    email: "",
                    password: "",
                    address: "",
                    join_date: "",
                    phone: "",
                })

                swal({
                    title: "Sukses",
                    text: "Berhasil menambah akun: " + name,
                    icon: "success",
                    button: false,
                    timer: 1500
                });
            })
    }

    //------------------------------------------------------------------------------

    // CRUD DELETE

    handleDelete = (id) => {

        // console.log(id)

        const { akuns } = this.state

        let delete_akun = akuns.filter(akun => akun.id === id)

        console.log(delete_akun)

        axios
            .delete(API_URL + "users/" + id)
            .then((res) => {

                console.log(res)

                let newAkun = akuns.filter(akun => akun.id !== id);

                this.setState({
                    akuns: newAkun
                });

                swal({
                    title: "Hapus Akun",
                    text: `Akun Berhasil Di Hapus`,
                    icon: "error",
                    button: false,
                    timer: 1600
                });

            })
            .catch(err => {
                console.log(err);
                swal({
                    title: "Proses Gagal, Coba Lagi",
                    text: `Akun Gagal Di Hapus`,
                    icon: "error",
                    button: false,
                    timer: 1500
                });
            });
    }

    //------------------------------------------------------------------------------

    render() {

        const { akuns } = this.state

        // console.log(akuns)

        return (

            <div>

                <div className="container mt-5">

                    <Tabel
                        akuns={akuns}
                        handleDelete={this.handleDelete}
                    />

                    <Formulir
                        {...this.state}
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                    />

                </div>

            </div>
        )
    }
}