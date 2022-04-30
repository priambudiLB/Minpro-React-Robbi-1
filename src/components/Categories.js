import { Col, ListGroup } from 'react-bootstrap'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

//----------------------------------------------------------------------------------------------------------------------

const Icon = ({ nama }) => {
  if (nama === 'Makanan') return <FontAwesomeIcon icon={faUtensils} classNmae="mr-2" />
  if (nama === 'Minuman') return <FontAwesomeIcon icon={faCoffee} />
  if (nama === 'Cemilan') return <FontAwesomeIcon icon={faCheese} classNmae="mr-1" />
}

//----------------------------------------------------------------------------------------------------------------------

export default class Categories extends Component {

  constructor(props) {
    super(props)

    this.state = {
    }
  }

  //----------------------------------------------------------------------------------------------------------------------

  render() {

    // const { categories } = this.state;

    const { changeCategory, categoryDipilih, categories } = this.props

    return (

      <Col md={2} mt="2" className="produk">

        <h4><strong>Daftar Kategori</strong></h4>
        <hr />

        <ListGroup>

          {categories && categories.map((category) => (

            <ListGroup.Item
              key={category.id}
              onClick={() => changeCategory(category.nama)}
              className={categoryDipilih === category.nama && 'active'}
              style={{ cursor: 'pointer' }}
            >

              <h5>
                <Icon nama={category.nama} /> {category.nama}
              </h5>

            </ListGroup.Item>

          ))}

        </ListGroup>

      </Col>
    )
  }
}
