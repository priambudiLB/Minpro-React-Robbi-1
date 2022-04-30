import React from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

//----------------------------------------------------------------------------------------------------------------------

const ModalEditProduct = ({
    showModalEdit,
    handleCloseEdit,
    pilihCategory,
    onChangeEdit,
    handleEditProduk,
    onChangeCategoriesEdit,
    // addProductChangeForm,
    // handleSubmit,
    categories,
    nama,
    quantity,
    harga,
    gambar
}) => {

    return (

        // HEADER

        <Modal show={showModalEdit} onHide={handleCloseEdit}>

            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Product
                </Modal.Title>
            </Modal.Header>

            {/* BODY */}

            <Modal.Body>

                {/* FORM */}

                <Form>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                        <Form.Label>Nama Product</Form.Label>

                        <Form.Control
                            name="nama"
                            value={nama}
                            onChange={(event) => onChangeEdit(event)}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                        <Form.Label>Stock</Form.Label>
                        <br />

                        <Form.Control
                            name="quantity"
                            value={quantity}
                            onChange={(event) => onChangeEdit(event)}
                        />


                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                        <Form.Label>Harga</Form.Label>
                        <br />

                        <Form.Control
                            name="harga"
                            value={harga}
                            onChange={(event) => onChangeEdit(event)}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                        <Form.Label>Gambar</Form.Label>
                        <br />

                        <Form.Control
                            name="gambar"
                            value={gambar}
                            onChange={(event) => onChangeEdit(event)}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                        <Form.Label>Kategori</Form.Label>
                        <br />

                        <Form.Select
                            aria-label="Default select example"
                            onChange={(event) => onChangeCategoriesEdit(event)}
                        >
                            <option value="" disabled>Pilih Category</option>
                            {categories.map((category) => {

                                {
                                    if (category.id === pilihCategory.id) {

                                        return <option value={category.id} selected>{category.nama}</option>
                                    } else {
                                        return <option value={category.id} >{category.nama}</option>

                                    }
                                }

                            })}

                        </Form.Select>

                    </Form.Group>

                </Form>

            </Modal.Body>

            {/* FOOTER */}

            <Modal.Footer>

                <Button
                    variant="success"
                    onClick={(event) => handleEditProduk(event)}
                >
                    Update Produk
                </Button>

            </Modal.Footer>

        </Modal>
    )

}

//----------------------------------------------------------------------------------------------------------------------

export default ModalEditProduct