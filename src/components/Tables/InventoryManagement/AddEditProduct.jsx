'use client'

import { useState, useEffect } from 'react'
import Breadcrumb from '../../Breadcrumbs/Breadcrumb'
import AddProduct from './AddProduct'
import EditProduct from './EditProduct'
import { getProducts } from '../../../utils/apiUtils'

export default function AddEditProduct() {
    const [isEditMode, setIsEditMode] = useState(false)
    const [products, setProducts] = useState([])
    const [productData, setProductData] = useState({
        product: '',
        name: '',
        colors: [],
        sizes: [],
        quantity: 0,
        description: '',
    })
    const [colorInput, setColorInput] = useState('')
    const [sizeInput, setSizeInput] = useState('')

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await getProducts()
            setProducts(fetchedProducts)
        }
        loadProducts()
    }, [])
    console.log(products)
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductData(prev => ({ ...prev, [name]: value }))
    }

    const handleColorChange = (e) => {
        setColorInput(e.target.value)
    }

    const handleSizeChange = (e) => {
        setSizeInput(e.target.value)
    }

    const addColor = () => {
        if (colorInput && !productData.colors.includes(colorInput)) {
            setProductData(prev => ({ ...prev, colors: [...prev.colors, colorInput] }))
            setColorInput('')
        }
    }

    const addSize = () => {
        if (sizeInput && !productData.sizes.includes(sizeInput)) {
            setProductData(prev => ({ ...prev, sizes: [...prev.sizes, sizeInput] }))
            setSizeInput('')
        }
    }

    const removeColor = (color) => {
        setProductData(prev => ({ ...prev, colors: prev.colors.filter(c => c !== color) }))
    }

    const removeSize = (size) => {
        setProductData(prev => ({ ...prev, sizes: prev.sizes.filter(s => s !== size) }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isEditMode) {
            console.log('Product updated:', productData)
        } else {
            console.log('Product added:', productData)
        }
    }

    return (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 md:p-8">
            <Breadcrumb pageName="Add/Edit Product" />
            <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8">
                    <div className="flex justify-center mb-6 space-x-4">
                        <button
                            className={`px-6 py-2 rounded-md font-semibold text-sm focus:outline-none transition-colors duration-200 ${!isEditMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-white'
                                }`}
                            onClick={() => setIsEditMode(false)}
                        >
                            Add Product
                        </button>
                        <button
                            className={`px-6 py-2 rounded-md font-semibold text-sm focus:outline-none transition-colors duration-200 ${isEditMode
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-white'
                                }`}
                            onClick={() => setIsEditMode(true)}
                        >
                            Edit Product
                        </button>
                    </div>

                    <div className="border-t border-slate-200 dark:border-slate-700 my-6"></div>

                    {isEditMode ? (
                        <EditProduct
                            products={products}
                            productData={productData}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            colorInput={colorInput}
                            sizeInput={sizeInput}
                            handleColorChange={handleColorChange}
                            handleSizeChange={handleSizeChange}
                            addColor={addColor}
                            addSize={addSize}
                            removeColor={removeColor}
                            removeSize={removeSize}
                        />
                    ) : (
                        <AddProduct
                            productData={productData}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            colorInput={colorInput}
                            sizeInput={sizeInput}
                            handleColorChange={handleColorChange}
                            handleSizeChange={handleSizeChange}
                            addColor={addColor}
                            addSize={addSize}
                            removeColor={removeColor}
                            removeSize={removeSize}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}