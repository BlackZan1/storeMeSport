import React, { useEffect } from 'react';
import { Affix, Tabs } from 'antd';
import { iDataItem, iState } from '../../redux/store';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './Cart.sass';
import { updateCartDataAction } from '../../redux/cart-reducer';

interface CartContainerProps {
    products: iDataItem[]
    waitingList: iDataItem[]
    totalSum: number
    token: string
    updateCartDataAction: (products: iDataItem[], waitingList: iDataItem[], token: string) => Promise<void>
}

const CartContainer:React.FC<CartContainerProps> = ({products, waitingList, token, totalSum, updateCartDataAction}) => {
    useEffect(() => {
        updateCartDataAction(products, waitingList, token);
    }, [updateCartDataAction, products, waitingList, token])

    return (
        <Affix offsetTop={30}>
                <React.Fragment>
                    {
                        products.length ? 
                        <Tabs defaultActiveKey="1" tabPosition={'right'} style={{minHeight: '150px', maxHeight: '300px', fontSize: 20}}>
                            {   
                                products.map((p: iDataItem, index: number) => {
                                    let shortName: string = '';

                                    if(p.name.length) {
                                        for(let i = 0; i < p.name.length; i++) {
                                            if(i <= 12) shortName += p.name[i];

                                            else if(i <= 15 && p.name.length > 15) shortName += '.';

                                            else if(i < 15 && p.name.length < 15) shortName += p.name[i];
                                        }
                                    }

                                    return <Tabs.TabPane tab={`${index + 1}) ${shortName}`} key={`${index + 1}`}>
                                        <p style={{fontSize: 16}}>
                                            {p.description}
                                        </p>

                                        <p className='cart-price'>{p.price} $</p>
                                    </Tabs.TabPane>
                                })
                            }
                        </Tabs>
                        :
                        null
                    }

                    <div style={{fontSize: 22, marginTop: 20}}>
                        {
                            !totalSum ? null : `Total cost: ${totalSum.toFixed(2)} $`
                        }
                    </div>
                </React.Fragment>
        </Affix>
    )
}

let mapStateToProps = (state: iState) => ({
    products: state.dataCart.data.products,
    waitingList: state.dataCart.data.waitingList,
    token: state.user.token,
    totalSum: state.dataCart.totalSum
})

const ComposedComponent: any = compose(
    connect(mapStateToProps, { updateCartDataAction })
)(CartContainer);

export default ComposedComponent;