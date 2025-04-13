import React from 'react';

const Order = (item,shippingAddress) => {
    return (
        <div className='flex flex-row'>
            <div>
                <img src={item.image} alt="" />
            </div> 
            <div className='flex flex-col'>
                <h2>
                    {item.name}
                </h2>
                <p>{item.quantity}</p>
            </div>
            <div>
                <p>Shipping Address:</p>
                <p>{shippingAddress.address1},</p>
                <p>{shippingAddress.address2}</p>
                <p>{shippingAddress.city},{shippingAddress.country}-{shippingAddress.zipCode}</p>
            </div>
            <div>
                <p>{item.price*item.quantity}</p>
            </div>
        </div>
    );
}

export default Order;
