import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

//----------------------------------------------------------------------------------------------------------------------

const ModalAddProduct = ({
    categories,
    showModal,
    handleClose,
    addProductChangeForm,
    handleSubmit,
    onChangeCategories,
    nama,
    quantity,
    harga,
    gambar,
}) => {

    return (

        // HEADER

        <Modal show={showModal} onHide={handleClose}>

            <Modal.Header closeButton>
                <Modal.Title>
                    Tambah Product
                </Modal.Title>
            </Modal.Header>

            {/* BODY */}

            <Modal.Body>

                {/* FORM */}

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                        <Form.Label>Nama Product</Form.Label>

                        <Form.Control
                            name="nama"
                            value={nama}
                            onChange={(event) => addProductChangeForm(event)} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                        <Form.Label>Stock</Form.Label>
                        <br />

                        <Form.Control
                            name="quantity"
                            value={quantity}
                            onChange={(event) => addProductChangeForm(event)} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                        <Form.Label>Harga</Form.Label>
                        <br />

                        <Form.Control
                            name="harga"
                            value={harga}
                            onChange={(event) => addProductChangeForm(event)} />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                        <Form.Label>Gambar</Form.Label>
                        <br />

                        <Form.Control
                            name="gambar"
                            value={gambar}
                            // onChange={(event) => addProductChangeForm(event)} 
                            disable/>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                        <Form.Label>Kategori</Form.Label>
                        <br />

                        <Form.Select
                            aria-label="Default select example"
                            onChange={ event => onChangeCategories(event) }
                        >
                            <option value="" disabled selected>Pilih Category</option>
                            {categories.map((category) =>
                                <option value={category.id}>{category.nama}</option>
                            )}

                        </Form.Select>

                    </Form.Group>

                </Form>

            </Modal.Body>

            {/* FOOTER */}

            <Modal.Footer>

                <Button
                    variant="success"
                    onClick={(event) => handleSubmit(event)}>

                    Tambah Produk
                </Button>

            </Modal.Footer>

        </Modal>
    )

}

//----------------------------------------------------------------------------------------------------------------------

export default ModalAddProduct