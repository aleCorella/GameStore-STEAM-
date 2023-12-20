import React from 'react';
import { IndividualProduct } from './IndividualProduct';

export const Products = ({ products, addToCart }) => {
    return (
        <div>
            {products.map((product) => (
                <IndividualProduct 
                    key={product.ID} 
                    url={product.url} 
                    title={product.nombre} 
                    description={product.descripcion} 
                    price={product.precio} 
                    addToCart={() => addToCart(product)}
                />
            ))}
        </div>
    );
}
