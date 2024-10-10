'use client'

import { useEffect, useState } from 'react'
import Select from 'react-select'
import { X } from 'lucide-react'
import { getProducts, getSuppliers, updateProduct } from '../../../utils/apiUtils'

export default function EditProduct({
    products,
    productData,
    handleInputChange,
    handleSubmit,
    colorInput,
    sizeInput,
    handleColorChange,
    handleSizeChange,
    addColor,
    addSize,
    removeColor,
    removeSize,
}) {
    const [suppliers, setSuppliers] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        const loadSuppliers = async () => {
            try {
                const fetchedSuppliers = await getSuppliers()
                setSuppliers(fetchedSuppliers)
            } catch (error) {
                console.error('Error fetching suppliers:', error)
            }
        }
        loadSuppliers()
    }, [])

    useEffect(() => {
        if (selectedProduct) {
            const fetchProductDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/api/v1/products/${selectedProduct}`)
                    const data = await response.json()
                    handleInputChange({ target: { name: 'product', value: data } })
                } catch (error) {
                    console.error('Error fetching product details:', error)
                }
            }
            fetchProductDetails()
        }
    }, [selectedProduct])

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 min-h-screen">
                <label htmlFor="product" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Select Product to Edit
                </label>
                <Select
                    options={products.map(product => ({ value: product._id, label: product.name }))}
                    onChange={(option) => setSelectedProduct(option.value)}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select a product to edit"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            backgroundColor: '#1F2937',
                            borderColor: '#4B5563',
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: '#1F2937',
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isSelected ? '#4B5563' : '#1F2937',
                            color: '#FFFFFF',
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: '#FFFFFF',
                        }),
                    }}
                />
            </div>

            {selectedProduct && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={productData.name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Product Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={productData.category}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            >
                                <option value="">Select Product Category</option>
                                <option value="T-Shirt">T-Shirt</option>
                                <option value="Leather">Leather</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="supplier" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Supplier
                            </label>
                            <Select
                                options={suppliers.map(supplier => ({ value: supplier._id, label: supplier.name }))}
                                onChange={(option) => handleInputChange({ target: { name: 'supplier', value: option.value } })}
                                value={suppliers.find(supplier => supplier._id === productData.supplier)}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select or search supplier"
                                styles={{
                                    control: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#1F2937',
                                        borderColor: '#4B5563',
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: '#1F2937',
                                    }),
                                    option: (provided, state) => ({
                                        ...provided,
                                        backgroundColor: state.isSelected ? '#4B5563' : '#1F2937',
                                        color: '#FFFFFF',
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: '#FFFFFF',
                                    }),
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="stock" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                In Stock
                            </label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={productData.stock}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Colors</label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={colorInput}
                                    onChange={handleColorChange}
                                    className="flex-grow px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    placeholder="Enter color"
                                />
                                <button
                                    type="button"
                                    onClick={addColor}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {productData.colors.map((color) => (
                                    <span key={color} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        {color}
                                        <button
                                            type="button"
                                            onClick={() => removeColor(color)}
                                            className="ml-2 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-500"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Sizes</label>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={sizeInput}
                                    onChange={handleSizeChange}
                                    className="flex-grow px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                                    placeholder="Enter size"
                                />
                                <button
                                    type="button"
                                    onClick={addSize}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {productData.sizes.map((size) => (
                                    <span key={size} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                        {size}
                                        <button
                                            type="button"
                                            onClick={() => removeSize(size)}
                                            className="ml-2 inline-flex items-center justify-center w-4 h-4 text-green-400 hover:text-green-500"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="price" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={productData.price}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="productionCost" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                Production Cost
                            </label>
                            <input
                                type="number"
                                id="productionCost"
                                name="productionCost"
                                value={productData.productionCost}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={productData.description}
                            onChange={handleInputChange}
                            required
                            rows={5}
                            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Update Product
                        </button>
                    </div>
                </>
            )}
        </form>
    )
}