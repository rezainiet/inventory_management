'use client'

import { useEffect, useState } from 'react'
import Select from 'react-select'
import { X, Plus } from 'lucide-react'
import { getProducts, getSuppliers, updateProduct } from '../../../utils/apiUtils'

export default function EditProduct() {
    const [products, setProducts] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        supplier: '',
        description: '',
        price: '',
        productionCost: '',
        image: '',
        variants: []
    })
    const [newVariant, setNewVariant] = useState({ color: '', size: '', stock: 0 })

    useEffect(() => {
        const loadData = async () => {
            try {
                const fetchedProducts = await getProducts()
                const fetchedSuppliers = await getSuppliers()
                setProducts(fetchedProducts)
                setSuppliers(fetchedSuppliers)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        loadData()
    }, [])

    useEffect(() => {
        if (selectedProduct) {
            const fetchProductDetails = async () => {
                try {
                    const response = await fetch(`http://localhost:4000/api/v1/products/${selectedProduct}`)
                    const data = await response.json()
                    setProductData(data)
                } catch (error) {
                    console.error('Error fetching product details:', error)
                }
            }
            fetchProductDetails()
        }
    }, [selectedProduct])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductData(prev => ({ ...prev, [name]: value }))
    }

    const handleVariantChange = (e) => {
        const { name, value } = e.target
        setNewVariant(prev => ({ ...prev, [name]: value }))
    }

    const addVariant = () => {
        if (newVariant.color && newVariant.size && newVariant.stock > 0) {
            setProductData(prev => ({
                ...prev,
                variants: [...prev.variants, newVariant]
            }))
            setNewVariant({ color: '', size: '', stock: 0 })
        }
    }

    const removeVariant = (index) => {
        setProductData(prev => ({
            ...prev,
            variants: prev.variants.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateProduct(selectedProduct, productData)
            // Handle successful update (e.g., show success message, reset form, etc.)
            console.log('Product updated successfully')
        } catch (error) {
            console.error('Error updating product:', error)
            // Handle error (e.g., show error message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
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
                                <option value="t-shirts-polos">T-Shirts & Polos</option>
                                <option value="shirts">Shirts</option>
                                <option value="jacket">Jacket</option>
                                <option value="jeans-pants">Jeans & Pants</option>
                                <option value="outerwear">Outerwear</option>
                                <option value="dresses-skirts">Dresses & Skirts</option>
                                <option value="suits-blazers">Suits & Blazers</option>
                                <option value="loungewear-sleepwear">Loungewear & Sleepwear</option>
                                <option value="activewear-sportswear">Activewear & Sportswear</option>
                                <option value="undergarments-lingerie">Undergarments & Lingerie</option>
                                <option value="accessories">Accessories</option>
                                <option value="childrens-clothing">Children's Clothing</option>
                                <option value="uniforms-workwear">Uniforms & Workwear</option>
                                <option value="sweaters-knitwear">Sweaters & Knitwear</option>
                                <option value="denimwear">Denimwear</option>
                                <option value="ethnic-traditional">Ethnic & Traditional Wear</option>
                            </select>
                        </div>
                    </div>

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
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            Variants (Color, Size, and Stock)
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                name="color"
                                value={newVariant.color}
                                onChange={handleVariantChange}
                                placeholder="Color"
                                className="flex-grow px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                            <input

                                type="text"
                                name="size"
                                value={newVariant.size}
                                onChange={handleVariantChange}
                                placeholder="Size"
                                className="flex-grow px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                            <input
                                type="number"
                                name="stock"
                                value={newVariant.stock}
                                onChange={handleVariantChange}
                                placeholder="Stock"
                                min="0"
                                className="flex-grow px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={addVariant}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mt-2 space-y-2">
                            {productData.variants.map((variant, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-700 rounded-md">
                                    <span className="text-sm text-slate-700 dark:text-slate-200">
                                        {variant.color} - {variant.size} - Stock: {variant.stock}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
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
                            rows={4}
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