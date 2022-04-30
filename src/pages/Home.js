import React, { Component } from 'react'
import { Col, Row, Container, Button } from 'react-bootstrap';

// import NavbarComponent from './components/Navbar';
// import Category from './components/Categories';
// import Hasil from './components/Hasil';
import { Categories, Hasil, Menus } from '../components';

import { API_URL } from '../utils/constants';

import axios from 'axios';

import swal from 'sweetalert';

import ModalAddProduct from '../components/Modal/ModalAddProduct';

import ModalEditProduct from '../components/Modal/ModalEditProduct';

//----------------------------------------------------------------------------------------------------------------------

export default class Home extends Component {

  constructor(props) {
    super(props)


    this.state = {

      // formaddproduct: {
      //   selected_category: "",
      //     nama: "",
      //       price: ""
      // }

      showModal: false,
      showModalEdit: false,
      menus: [],
      categories: [],
      categoryDipilih: 'Makanan',
      pilihCategory: '',
      keranjangs: [],
      nama: "",
      quantity: 0,
      harga: 0,
      gambar: "",
      id: "",
    }
  }

  //----------------------------------------------------------------------------------------------------------------------

  // GET MENUS

  componentDidMount() {

    axios
      // .get(API_URL + "products")
      .get(API_URL + "products?category.nama=" + this.state.categoryDipilih)
      .then((res) => {

        console.log("respons :", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(err => {
        console.log(err);
      })

    this.getListKeranjang();

    //----------------------------------------------------------------------------------------------------------------------

    axios
      .get(API_URL + "categories")
      .then((res) => {

        const categories = res.data;
        this.setState({ categories });
      })
      .catch(err => {
        console.log(err);
      })

  }

  //----------------------------------------------------------------------------------------------------------------------

  // GET LIST KERANJANG YANG DI FILTER

  changeCategory = (value) => {
    this.setState({
      categoryDipilih: value,
      menus: [],
    })

    axios
      // .get(API_URL + "products")
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {

        console.log("respons :", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(err => {
        console.log(err);
      })
  }

  //----------------------------------------------------------------------------------------------------------------------

  // componentDidUpdate(prevState) {
  //   if (this.state.keranjangs !== prevState.keranjangs) {

  //     axios
  //       // .get(API_URL + "products")
  //       .get(API_URL + "keranjangs")
  //       .then((res) => {

  //         console.log("respons :", res);
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   }
  // }

  getListKeranjang = () => {
    axios
      // .get(API_URL + "products")
      .get(API_URL + "keranjangs")
      .then((res) => {

        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(err => {
        console.log(err);
      })
  } // INI AMBIL SEMUA DATA DARI KERANJANG

  //----------------------------------------------------------------------------------------------------------------------

  // AMBIL DATA DARI MENU > KETIKA DI KLIK PRODUCTNYA > MASUK KE KERANJANG DI DATABASE

  masukKeranjang = (value) => {
    // console.log(value);

    axios
      // .get(API_URL + "products")
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {

        if (res.data.length === 0) {

          const keranjang = {

            // INI YANG AKAN MASUK KE DATABASE KERANJANGS

            jumlah: 1,
            total_harga: value.harga,
            product: value,
          }

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses",
                text: `Berhasil: ${keranjang.product.nama} masuk keranjang`,
                icon: "success",
                button: false,
                timer: 1500
              });
            })
            .catch(err => {
              console.log(err);
            });
        } else {

          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
            // product.quantity: res.data[0].product.quantity - 1,
          }

          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {

              swal({
                title: "Sukses",
                text: "Berhasil masuk keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1300
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  //----------------------------------------------------------------------------------------------------------------------

  // MULAI MASUK KE BAGIAN MODAL ADD PRODUCT

  addProductChangeForm = (event) => {
    this.setState({

      [event.target.name]: event.target.value

    })
  }

  //----------------------------------------------------------------------------------------------------------------------

  handleSubmit = (event) => {

    event.preventDefault();

    const { nama, quantity, harga, gambar, pilihCategory } = this.state;

    const data = {
      nama,
      quantity,
      harga,
      gambar,
      category: pilihCategory
    }

    // console.log(data)

    if (nama === "" || quantity === "" || harga === "" || pilihCategory === "") {
      return alert("Semua data harus di isi")
    }

    axios
      .post(API_URL + "products/", data)
      .then((res) => {
        // const res = res.data;
        const { nama, quantity, harga, id, gambar, category } = res.data

        this.setState({
          menus: [...this.state.menus,
          {
            id: id,
            quantity: quantity,
            nama: nama,
            harga: harga,
            gambar: gambar,
            category: category
          }],
          showModal: false,
          nama: "",
          quantity: 0,
          harga: 0,
          gambar: '',
          pilihCategory: '',
        });

        swal({
          title: "Sukses",
          text: "Berhasil menambah product: " + nama,
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

  handleShow = () => {
    this.setState({
      showModal: true,
    })
  }

  //----------------------------------------------------------------------------------------------------------------------

  handleClose = () => {
    this.setState({
      showModal: false,
    })
  }

  //----------------------------------------------------------------------------------------------------------------------

  handleEdit = (event) => {

    event.preventDefault();

    this.handleShow();

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

  handleDelete = (id) => {

    // console.log(id);
    let deleted_item = this.state.menus.filter(menu => menu.id === id);

    axios
      .delete(API_URL + "products/" + id)
      .then((res) => {

        let newProduct = this.state.menus.filter(menu => menu.id !== id);

        this.setState({
          menus: newProduct
        });

        swal({
          title: "Hapus Pesanan",
          text: `Produk ${deleted_item[0].nama} Berhasil Di Hapus`,
          icon: "error",
          button: false,
          timer: 1500
        });

        this.getListKeranjang();
      })
      .catch(err => {
        console.log(err);
        swal({
          title: "Proses Gagal, Coba Lagi",
          text: `Produk ${deleted_item[0].nama} Gagal Di Hapus`,
          icon: "error",
          button: false,
          timer: 1500
        });
      });

  }

  //----------------------------------------------------------------------------------------------------------------------

  onChangeCategories = (e) => {

    // console.log(e.target.value);

    let id = parseInt(e.target.value);

    let select_category = this.state.categories.filter(category => parseInt(category.id) === id);

    console.log(select_category[0])

    this.setState({
      pilihCategory: select_category[0]
    })
  }

  //----------------------------------------------------------------------------------------------------------------------

  handleShowEdit = (id) => {

    console.log(id)

    let edit_item = this.state.menus.filter(menu => menu.id === id);

    console.log(edit_item)

    this.setState({
      showModalEdit: true,
      id: id,
      nama: edit_item[0].nama,
      quantity: edit_item[0].quantity,
      harga: edit_item[0].harga,
      gambar: edit_item[0].gambar,
      pilihCategory: edit_item[0].category
    })
  }

  handleCloseEdit = () => {
    this.setState({
      showModalEdit: false,
    })
  }

  onChangeEdit = (e) => {

    console.log(e.target.value);

    this.setState({

      [e.target.name]: e.target.value

    })
  }

  onChangeCategoriesEdit = (e) => {

    // console.log(e.target.value);

    let id = parseInt(e.target.value);

    let select_category = this.state.categories.filter(category => parseInt(category.id) === id);

    console.log(select_category[0])

    this.setState({
      pilihCategory: select_category[0]
    })
  }

  handleEditProduk = (event) => {

    event.preventDefault();

    const { nama, quantity, harga, gambar, pilihCategory } = this.state

    const data = {
      nama,
      quantity,
      harga,
      gambar,
      category: pilihCategory,
    }

    console.log(data)

    axios
      .put(API_URL + "products/" + this.state.id, data)
      .then((res) => {

        // console.log(res);

        const { nama, quantity, harga, id, gambar, category } = res.data

        this.setState({
          menus: this.state.menus.map(menu => {
            if (menu.id === id) {
              return {
                id: id,
                quantity: quantity,
                nama: nama,
                harga: harga,
                gambar: gambar,
                category: category
              }
            } else {
              return menu
            }
          }),

          showModalEdit: false,
          id: "",
          nama: "",
          quantity: 0,
          harga: 0,
          gambar: '',
          pilihCategory: '',
        });

        swal({
          title: "Ubah Produk",
          text: `Produk ${nama} Berhasil Di Ubah`,
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

  render() {

    const { menus, categoryDipilih, keranjangs, categories } = this.state;
    
    return (
      <div className="mt-3">

        {/* <NavbarComponent /> */}

        <div className="mt-3 produk">

          <Container fluid>

            <Row>

              {/* CATEGORY */}

              <Categories
                changeCategory={this.changeCategory}
                categoryDipilih={categoryDipilih}
                categories={categories}
              />

              {/* MENUS */}

              <Col className="mr-6 produk" style={{ marginRight: '15px' }}>

                <div>

                  {/* DAFTAR PORDUK */}

                  <h4>Daftar Produk</h4>


                  {((localStorage.getItem('accessToken'))) ?
  
                    <>
  
                      <Button
                        onClick={() => this.handleShow()}>
  
                        Tambah Produk
  
                      </Button>
  
                      <ModalAddProduct
                        {...this.state}
                        handleClose={this.handleClose}
                        addProductChangeForm={this.addProductChangeForm}
                        handleSubmit={this.handleSubmit}
                        categories={categories}
                        onChangeCategories={this.onChangeCategories}
                      />
                      <ModalEditProduct
                        {...this.state}
                        handleCloseEdit={this.handleCloseEdit}
                        onChangeEdit={this.onChangeEdit}
                        handleEditProduk={this.handleEditProduk}
                        onChangeCategoriesEdit={this.onChangeCategoriesEdit}
                      />
  
                    </>
  
                    :
  
                    ""
                  }


                </div>
                <hr />

                <Row className="overflow-auto menu pr-5">

                  {menus && menus.map((menu, index) => (
                    // <h2> {menu.nama} </h2>
                    
                    // MENUS
                    
                    <Menus
                    key={index}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang}
                    handleEdit={this.handleEdit}
                    handleDelete={this.handleDelete}
                    handleShowEdit={this.handleShowEdit}
                    />
                    
                  ))}

                </Row>

              </Col>

              {/* HASIL */}

              <Hasil
                keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}
              />
              
            </Row>

          </Container>

        </div>

      </div>
    )
  }
}