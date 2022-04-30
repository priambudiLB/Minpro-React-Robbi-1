import React, { Component } from 'react'
import { Col, ListGroup, Row, Badge, Card } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils';
import TotalBayar from './TotalBayar';
import ModalKeranjang from './Modal/ModalKeranjang';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import swal from 'sweetalert';

//----------------------------------------------------------------------------------------------------------------------

export default class Hasil extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '-',
            totalHarga: 0
        }
    }

    //----------------------------------------------------------------------------------------------------------------------

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga
        })
    }

    //----------------------------------------------------------------------------------------------------------------------

    handleClose = () => {
        this.setState({
            showModal: false,
        })
    }

    //----------------------------------------------------------------------------------------------------------------------

    // TOMBOL TAMBAH

    tambah = () => {

        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }

    //----------------------------------------------------------------------------------------------------------------------

    // TOMBOL KURANG

    kurang = () => {

        if (this.state.jumlah !== 1) {

            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }
    }

    //----------------------------------------------------------------------------------------------------------------------

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }

    //----------------------------------------------------------------------------------------------------------------------

    // TOMBOL UPDATE

    handleSubmit = (event) => {

        event.preventDefault();

        this.handleClose();

        const data = {

            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        }

        axios
            .put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then((res) => {
                this.props.getListKeranjang();
                swal({
                    title: "Ubah Pesanan",
                text: `Pesanan ${data.product.nama} Berhasil Di Ubah`,
                    icon: "success",
                    button: false,
                    timer: 1300
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    //----------------------------------------------------------------------------------------------------------------------

    // TOMBOL DELETE

    handleDelete = (id) => {

        this.handleClose();

        axios
            .delete(API_URL + "keranjangs/" + id)
            .then((res) => {
                this.props.getListKeranjang();
                swal({
                    title: "Hapus Pesanan",
                    text: `Pesanan ${this.state.keranjangDetail.product.nama} Berhasil Di Hapus`,
                    icon: "error",
                    button: false,
                    timer: 1500
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    //----------------------------------------------------------------------------------------------------------------------

    render() {

        const { keranjangs } = this.props;

        return (

            <Col md={3} mt="2">

                <h4><strong>Keranjang</strong></h4>
                <hr />

                {
                    keranjangs.length !== 0 && (

                        <Card className="overflow-auto hasil">

                            <ListGroup variant="flush">

                                {keranjangs.map((menuKeranjang) => (

                                    <ListGroup.Item
                                        key={menuKeranjang.id}
                                        onClick={() => this.handleShow(menuKeranjang)} >

                                        {/* {menuKeranjang.product.nama} */}

                                        {/* INI ISI KERANJANGANYA : 
                                        ADA JUMALH (NOMER), PRODCUKNYA, HARGANYA, KETERANGANNYA
                                        (ISI DARII KOLOM KERANJANG)  */}

                                        <Row>
                                            <Col xs={2}>
                                                <h4>
                                                    <Badge pill bg="success">
                                                        {menuKeranjang.jumlah}
                                                    </Badge>
                                                </h4>
                                            </Col>

                                            <Col>
                                                <h5>{menuKeranjang.product.nama}</h5>
                                                <p>Rp. {numberWithCommas(menuKeranjang.product.harga)} </p>
                                            </Col>


                                            <Col>
                                                <strong className="float-right">
                                                    <p>Rp. {numberWithCommas(menuKeranjang.total_harga)} </p>
                                                </strong>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col>
                                                Keterangan :
                                                <br />
                                                <h5 className="mt-2">{menuKeranjang.keterangan}</h5>
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>

                                ))}

                                <ModalKeranjang
                                    handleClose={this.handleClose}
                                    {...this.state}
                                    tambah={this.tambah}
                                    kurang={this.kurang}
                                    changeHandler={this.changeHandler}
                                    handleSubmit={this.handleSubmit}
                                    handleDelete={this.handleDelete} />

                            </ListGroup>

                        </Card>
                    )
                }

                {/* TOTAL HARGA YANG DI BAYAR
                ADA DI KOLOM KERANJANG BAGIAN PALING BAWAH */}

                <TotalBayar keranjangs={keranjangs} {...this.props} />

            </Col >
        )
    }
}
