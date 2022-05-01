import React from "react";
import { Col, Card, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

//----------------------------------------------------------------------------------------------------------------------

const Menus = ({ menu, masukKeranjang, handleDelete, handleShowEdit, ModalEditProduct }) => {

    return (

        <Col md={4} xs={6} className="mb-4">

            <Card className="shadow">

                {/* IMAGE */}

                <Card.Img
                    variant="top"
                    src={"Images/" +
                        menu.category.nama.toLowerCase() +
                        "/" +
                        menu.gambar} />

                <Card.Body>

                    {/* NAMA */}

                    <Card.Title>

                        {menu.nama}
                        <br />
                        {/* <strong>({menu.kode})</strong>  */}

                    </Card.Title>

                    {/* STOCK */}

                    <Card.Text>

                        Rp. {numberWithCommas(menu.harga)}
                        <br />

                        Tersedia : {menu.quantity}

                    </Card.Text>

                    {/* INI KONDISI PROTEKSI */}

                    {/* jika ada akses login ada, maka dia bisa edit dan delete */}

                    {((localStorage.getItem('accessToken'))) ?

                        <>

                            <Button
                                onClick={() => handleShowEdit(menu.id)}
                            >
                                Edit
                            </Button>
                            {" "}

                            {/* DELETE */}

                            <Button
                                className="btn btn-danger"
                                onClick={() => handleDelete(menu.id)}>
                                Delete
                            </Button>
                            {" "}

                        </>

                        :

                        // ""

                        <Button
                            className="btn btn-success"
                            onClick={() => masukKeranjang(menu)}>
                            Tambah ke Keranjang
                        </Button>

                    }

                    {/*--- EDIT ---*/}

                    {/* <Button
                        className="btn btn-success"
                        onClick={() => masukKeranjang(menu)}>
                        Tambah ke Keranjang
                    </Button> */}

                </Card.Body>

            </Card>

        </Col>
    )
}

//----------------------------------------------------------------------------------------------------------------------

export default Menus