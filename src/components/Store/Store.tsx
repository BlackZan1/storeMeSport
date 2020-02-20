import React from 'react';
import { iDataItem } from '../../redux/store';
import { Row, Col } from 'antd';
import CartContainer from '../Cart/Cart';
import StoreItem from './StoreItem/StoreItem';

interface StoreProps {
    products: iDataItem[]
    cart: iDataItem[]
    totalSum: number
}

const Store: React.FC<StoreProps> = ({ products, cart, totalSum }) => {
    console.log(cart);

    return (
        <Row>
            <Col span={18}>
                <Row className='Wrapper' gutter={[40, 24]} style={{flexWrap: 'wrap'}}>
                    {
                        products.length !== 0 ? products.map((p: iDataItem) => {
                            if(cart.some((cp: iDataItem) => cp.id === p.id)) {
                                let count = 0;

                                cart.forEach((i: iDataItem) => (i.id === p.id) ? count += 1 : count += 0)

                                return <StoreItem count={count} name={p.name} image={p.productImagePath} description={p.description} price={p.price} id={p.id} key={p.id} />
                            }

                            return <StoreItem name={p.name} image={p.productImagePath} description={p.description} price={p.price} id={p.id} key={p.id} />
                        })
                        :
                        <h1>No products</h1>
                    }
                </Row>
            </Col>

            <Col span={6}>
                <CartContainer />
            </Col>
        </Row>
    )
}

export default Store;