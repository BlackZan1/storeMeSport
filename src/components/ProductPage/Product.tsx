import React, { useState, useEffect } from 'react';
import { Divider, Layout, Row, Col, Button, Icon, Modal, Drawer } from 'antd';
import { iDataItem } from '../../redux/store';
import ParallaxComponent from './utils/parallax';
import './Product.sass';
import { NavLink } from 'react-router-dom';

interface ProductProps {
    product: iDataItem
    setOneItemToProducts: (item: iDataItem) => void
}

interface ProductCategorySectionProps {
    title: string
    subtitle: string
}

const ProductCategorySection: React.FC<ProductCategorySectionProps> = ({title, subtitle}) => (
    <div className='product-content-category'>
        <Divider orientation={'left'}>{title}</Divider>

        <p>
            {subtitle}
        </p>
    </div>
)

const Product: React.FC<ProductProps> = ({ product: {name, productImagePath, price, ...props}, setOneItemToProducts }) => {
    let bg: string[] = ['bg-1', 'bg-2', 'bg-3'];

    let [modalMode, setModalMode] = useState<boolean>(false);
    let [drawerMode, setDrawerMode] = useState<boolean>(false);
    let [addedMode, setAddedMode] = useState<boolean>(false);
    let [titleClass, setTitleClass] = useState<string>('');

    useEffect(() => {
        if(!titleClass.length) {
            setTitleClass(bg[Math.round(Math.random() * (bg.length - 1))]);
        }
    }, [bg, titleClass])

    useEffect(() => {
        if(drawerMode) {
            setTimeout(() => {
                setDrawerMode(false)
            }, 2000)
        }
    })

    const addItemToCart = () => {
        setDrawerMode(true);
        setOneItemToProducts({name, productImagePath, price, ...props});
        setAddedMode(true);
    }

    return <Layout.Content className='product-content'>
        <Divider className={`product-title ${titleClass}`}>{ name }</Divider>
            <Row style={{flexWrap: 'wrap'}} type={'flex'} gutter={[12, 26]}>
                <Col span={8} onClick={() => setModalMode(true)}>
                    <ParallaxComponent id={'scene'}>
                        <img 
                            data-depth="0.2" 
                            className='product-content-img layer' 
                            src={productImagePath} alt={'Loading...'}
                        />
                    </ParallaxComponent>
                </Col>

                <Col span={8}>
                    <ProductCategorySection title={'Description'} subtitle={props.description} />

                    <ProductCategorySection title={'Made In'} subtitle={props.madeIn} />

                    <ProductCategorySection title={'Season'} subtitle={props.season} />

                    <ProductCategorySection title={'For'} subtitle={props.category} />
                    
                    <Row align={'middle'} className={'product-content-bottom'}>                
                        <Col span={12}>
                            {
                                !addedMode ? <Button type="primary" size={'large'} style={{fontSize: '18px'}} onClick={addItemToCart}>
                                    Add to Cart
                                    <Icon type="right" />
                                </Button>
                                :
                                <NavLink to={'/products'} onClick={() => setDrawerMode(false)}>
                                    <Button type="link" size={'large'} style={{fontSize: '18px'}}>
                                        Go to Store
                                        <Icon type="right" />
                                    </Button>
                                </NavLink>
                            }
                        </Col>

                        <Col span={8}>
                            <h1 className='product-content-price'>{price} $</h1>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Modal
                footer={null}
                visible={modalMode}
                onCancel={() => setModalMode(false)}
            >
                <img className='product-modal-img' src={productImagePath} alt='YO-YO-ERROR' />
            </Modal>

            <Drawer
                height={150}
                visible={drawerMode} 
                placement='bottom'
                title={'Success'} 
                closable={false} 
                onClose={() => setDrawerMode(false)}
            >
                <p>Success, {name} added to your cart</p>
            </Drawer>
    </Layout.Content>
}

export default Product;