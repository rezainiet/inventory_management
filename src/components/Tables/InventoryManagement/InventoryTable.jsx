import ProductOne from '../../../images/product/product-01.png';
import ProductTwo from '../../../images/product/product-02.png';
import ProductThree from '../../../images/product/product-03.png';
import ProductFour from '../../../images/product/product-04.png';
import Breadcrumb from '../../Breadcrumbs/Breadcrumb';

// Example inventory data
const inventoryData = [
    {
        image: ProductOne,
        name: 'Apple Watch Series 7',
        sku: 'AW-203',
        stock: 20,
        price: 399,
        category: 'Electronics',
        status: 'In Stock',
    },
    {
        image: ProductTwo,
        name: 'Macbook Pro M1',
        sku: 'MBP-543',
        stock: 12,
        price: 1299,
        category: 'Electronics',
        status: 'In Stock',
    },
    {
        image: ProductThree,
        name: 'Dell Inspiron 15',
        sku: 'DI-786',
        stock: 5,
        price: 899,
        category: 'Computers',
        status: 'Low Stock',
    },
    {
        image: ProductFour,
        name: 'HP Probook 450',
        sku: 'HPB-920',
        stock: 0,
        price: 499,
        category: 'Computers',
        status: 'Out of Stock',
    },
];

const InventoryTable = () => {
    return (
        <div>
            <Breadcrumb pageName="Inventory List" />
            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                <div className="py-4 px-4 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Inventory List
                    </h4>
                </div>

                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="min-w-[200px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    Product Name
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    SKU
                                </th>
                                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-center">
                                    Stock
                                </th>
                                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-center">
                                    Price
                                </th>
                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                    Category
                                </th>
                                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-center">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryData.map((product, key) => (
                                <tr key={key}>
                                    <td className="border-b border-[#eee] py-5 px-4 xl:pl-11 dark:border-strokedark">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-12.5 w-15 rounded-md object-cover"
                                            />
                                            <p className="text-sm font-medium text-black dark:text-white">
                                                {product.name}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-sm text-black dark:text-white">
                                            {product.sku}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                                        <p
                                            className={`text-sm ${product.stock > 0
                                                ? 'text-black'
                                                : 'text-danger'} dark:text-white`}
                                        >
                                            {product.stock}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                                        <p className="text-sm text-black dark:text-white">
                                            ${product.price}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <p className="text-sm text-black dark:text-white">
                                            {product.category}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                                        <p
                                            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${product.status === 'In Stock'
                                                ? 'bg-success bg-opacity-10 text-success'
                                                : product.status === 'Low Stock'
                                                    ? 'bg-warning bg-opacity-10 text-warning'
                                                    : 'bg-danger bg-opacity-10 text-danger'
                                                }`}
                                        >
                                            {product.status}
                                        </p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InventoryTable;
