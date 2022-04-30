import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import { numberWithCommas } from '../../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//----------------------------------------------------------------------------------------------------------------------

const ModalKeranjang = ({ 
    showModal,
    handleClose,
    keranjangDetail,
    jumlah,
    notes,
    tambah,
    kurang,
    changeHandler,
    handleSubmit,
    totalHarga,
    handleDelete
}) => {

    if (keranjangDetail) {

        return (

            // HEADER

            <Modal show={showModal} onHide={handleClose}>

                <Modal.Header closeButton>

                    <Modal.Title>
                        {keranjangDetail.product.nama} {" "}
                        (Rp. {numberWithCommas(keranjangDetail.product.harga)})
                    </Modal.Title>

                </Modal.Header>

                {/* BODY */}

                <Modal.Body>

                    {/* FORM */}

                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                            <Form.Label>Total Harga</Form.Label>

                            <p>
                                (Rp. {numberWithCommas(totalHarga)})
                            </p>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                            <Form.Label>Jumlah</Form.Label>
                            <br />

                            {/* TOMBOL KURANG */}

                            <Button
                                variant="success"
                                size="sm"
                                className="mr-2"
                                onClick={() => kurang()}>

                                <FontAwesomeIcon icon="fa-minus" />
                                Kurangi
                            </Button>

                            {" "} {jumlah} {" "}

                            {/* TOMBOL TAMBAH */}

                            <Button
                                variant="success"
                                size="sm"
                                className="ml-2"
                                onClick={() => tambah()}>

                                <FontAwesomeIcon icon="fa-circle-plus" />
                                Tambah
                            </Button> {" "} {" "}

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                            <Form.Label>Notes</Form.Label>
                            <br />

                            <Form.Control
                                as="textarea"
                                row="3"
                                name="notes"
                                placeholder="contoh = pedas sekali"
                                value={notes}
                                onChange={(event) => changeHandler(event)} />

                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Simpan
                        </Button>

                    </Form>

                </Modal.Body>

                {/* FOOTER */}

                <Modal.Footer>

                    <Button
                        variant="danger" onClick={() => handleDelete(keranjangDetail.id)}>
                        <FontAwesomeIcon icon="fa-thin fa-trash" />
                        Hapus Pesanan
                    </Button>

                </Modal.Footer>

            </Modal>
        )

    } else {
        return null
    }

}

//----------------------------------------------------------------------------------------------------------------------

export default ModalKeranjang