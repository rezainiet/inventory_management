import { PlusCircle, DollarSign, Package, Truck, PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

function ActionButton({ icon, label, description, href, color }) {
    return (
        <Link to={href} className={`flex flex-col items-start space-y-2 p-4 rounded-lg border ${color} transition-colors duration-200 hover:bg-opacity-80 hover:shadow-md`}>
            <div className="flex items-center space-x-3">
                <span className="dark:text-slate-500 text-slate-900">{icon}</span>
                <span className="dark:text-slate-500 text-slate-900 font-medium text-gray-800">{label}</span>
            </div>
            <span className="text-sm text-gray-600">{description}</span>
        </Link>
    );
}

export default function EasyCards() {
    return (
        <div className="p-4 border border-gray-700 rounded-xl mb-12">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <p className="mb-6 text-gray-700">Choose an action below to manage your inventory efficiently.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <ActionButton
                    icon={<PlusCircle size={24} />}
                    label="Add Product"
                    description="Quickly add new products to your inventory."
                    href="/inventory/add-edit"
                    color="bg-green-100 border-green-200"
                />
                <ActionButton
                    icon={<DollarSign size={24} />}
                    label="Sell a Product"
                    description="Create a new order for your products."
                    href="/orders/create"
                    color="bg-blue-100 border-blue-200"
                />
                <ActionButton
                    icon={<Package size={24} />}
                    label="Track Order"
                    description="Check the status of your current orders."
                    href="/orders/tracking"
                    color="bg-purple-100 border-purple-200"
                />
                <ActionButton
                    icon={<PackageOpen size={24} />}
                    label="Order List"
                    description="View the details of all your orders, including status and tracking information."
                    href="/orders/list"
                    color="bg-pink-100 border-pink-200"
                />

            </div>
        </div>
    );
}
