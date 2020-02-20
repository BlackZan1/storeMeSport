import React from 'react';
import { Col, Card } from 'antd';
import { NavLink } from 'react-router-dom';
import noImage from '../../../public/img/noimage.png';


interface StoreItemProps {
    id: number | string
    description: string
    name: string
    price: number
    image: string
    count?: number
}

const StoreItem: React.FC<StoreItemProps> = ({id, name, description, price, image, count = 0}) => {
    const showItemInfo = () => {
        return (
            <NavLink to={`/product/${id}`} className='store-item'>
                <Card hoverable cover={
                    <img src={image ? image : noImage} alt="Alol"/>
                }>

                    <Card.Meta title={name} description={description} avatar={`${price} $`} />
                
                </Card>
            </NavLink>
        )
    }

    return (
        <Col span={10}>
            {
                <>
                    {
                        showItemInfo()
                    }
                </>
            }
            
        </Col>
    )
}

export default StoreItem;