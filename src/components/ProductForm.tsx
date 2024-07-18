import { Product } from "../types"

type ProductTypes = {
    product?: Product
}

const ProductForm = ({ product } : ProductTypes) => {
    return (    
        <>
            <div className="mb-4">
                <label
                    className="text-white"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input 
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-slate-700 outline-none text-white"
                    placeholder="Nombre del Producto"
                    name="name"
                    defaultValue={product?.name}
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-white"
                    htmlFor="price"
                >Precio:</label>
                <input 
                    id="price"
                    type="number"
                    step="0.01"
                    className="mt-2 block w-full p-3 bg-slate-700 outline-none text-white"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                    defaultValue={product?.price}
                />
            </div>
        </>
    )   
}

export default ProductForm