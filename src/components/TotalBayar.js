import React, { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../utils/constants';

//----------------------------------------------------------------------------------------------------------------------

export default class TotalBayar extends Component {

    submitTotal = (totalBayar) => {

        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs
        }

        axios.post(API_URL + "pesanans", pesanan,
            {
                headers: {

                    authorization: localStorage.getItem('accessToken'),

                }
            })
            .then((res) => {

                window.location.href = "/sukses"
            })
    }

    //----------------------------------------------------------------------------------------------------------------------

    render() {

        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0)

        //----------------------------------------------------------------------------------------------------------------------

        return (

            <div>
                <Row>

                    <Col
                        style={{ marginBottom: '2.5rem' }}
                        className="px-4 mt-4">

                        <h5> Total Harga : {" "} </h5>

                        <h4>
                            Rp.{numberWithCommas(totalBayar)}
                        </h4>

                        <Button
                            variant="success"
                            className="mb-2"
                            onClick={() => this.submitTotal(totalBayar)} >

                            <div>
                                <FontAwesomeIcon icon={faShoppingCart} className="pr-3" />
                            </div>

                            Bayar Disini

                        </Button>

                    </Col>

                </Row>

            </div>
        )
    }
}
