import React, { useEffect, useState } from "react";
import { Calendar, ShoppingCart, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getLastMonthSales, getLastSevenDaysSales, getTopSellingProducts, getTotalSales } from "../../utils/apiUtils";

Chart.register(...registerables);

const monthlySales = [4500, 5000, 4800, 5200, 5800, 6000];

export default function FocusedSalesReport() {
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(false);
    const [lastMonthSales, setLastMonthSales] = useState();
    const [lastSevenDaysSales, setLastSevenDaysSales] = useState();
    const [allTimeSales, setAllTimeSales] = useState();
    const [topSellingProducts, setTopSellingProducts] = useState([]);

    useEffect(() => {
        const getLastMonthSalesData = async () => {
            setLoading(true);
            try {
                const data = await getLastMonthSales();
                setLastMonthSales(data);
            } catch (err) {
                console.error("Error fetching last month sales data:", err);
            } finally {
                setLoading(false);
            }
        };
        getLastMonthSalesData();
    }, []);

    useEffect(() => {
        const getLastSevenDaysSalesData = async () => {
            setLoading(true);
            try {
                const data = await getLastSevenDaysSales();
                setLastSevenDaysSales(data);
            } catch (err) {
                console.error("Error fetching last seven days sales data:", err);
            } finally {
                setLoading(false);
            }
        };
        getLastSevenDaysSalesData();
    }, []);

    useEffect(() => {
        const getAllTimeSalesData = async () => {
            setLoading(true);
            try {
                const data = await getTotalSales();
                setAllTimeSales(data);
            } catch (err) {
                console.error("Error fetching all time sales data:", err);
            } finally {
                setLoading(false);
            }
        };
        getAllTimeSalesData();
    }, []);

    // Fetching top selling products
    useEffect(() => {
        const fetchTopSellingProducts = async () => {
            setLoading(true);
            try {
                const response = await getTopSellingProducts();
                // Format the top-selling products data
                // const formattedProducts = response?.trendingProducts?.map(product => ({
                //     name: product.productDetails.name,
                //     sales: product.totalQuantity,
                //     price: product.productDetails.price,
                //     image: product.productDetails.image,
                //     trend: product.totalQuantity > 0 ? "up" : "down",
                // })) || [];
                setTopSellingProducts(response?.topSellingProducts);
            } catch (err) {
                console.error("Error fetching top selling products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTopSellingProducts();
    }, []);
    console.log(topSellingProducts)

    const salesData = {
        lastMonth: {
            sales: lastMonthSales?.salesData?.length || 0,
            amount: lastMonthSales?.totalSales || 0,
        },
        lastWeek: {
            sales: lastSevenDaysSales?.salesData?.length || 0,
            amount: lastSevenDaysSales?.totalSales || 0,
        },
        totalProfit: allTimeSales?.totalProfit || 0,
        totalSales: allTimeSales?.salesData?.length || 0,
    };

    const handleReportClick = () => {
        setLoading(true);
        setTimeout(() => {
            alert("Detailed report generated.");
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen p-8 transition-all duration-300 bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Sales Dashboard</h1>
                </header>

                <nav className="mb-8">
                    <ul className="flex space-x-4 bg-white dark:bg-slate-800 p-2 rounded-lg shadow-md">
                        {["Overview", "Products", "Customers", "Trends"].map((tab) => (
                            <li key={tab}>
                                <button
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                    className={`px-4 py-2 rounded-md transition-colors duration-200 ${activeTab === tab.toLowerCase()
                                        ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {activeTab === "overview" && (
                    <Overview
                        salesData={salesData}
                        monthlySales={monthlySales}
                        topProducts={topSellingProducts} // Use the formatted products here
                        handleReportClick={handleReportClick}
                        loading={loading}
                    />
                )}
                {activeTab === "products" && <ProductsTab products={topSellingProducts} />} {/* Use the correct state */}
                {activeTab === "customers" && <CustomersTab />}
                {activeTab === "trends" && <TrendsTab />}
            </div>
        </div>
    );
}

function Overview({ salesData, monthlySales, topProducts, handleReportClick, loading }) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <SalesMetricCard
                    title="Last Month Sales"
                    value={salesData.lastMonth.sales}
                    subValue={`৳${salesData.lastMonth.amount.toLocaleString()}`}
                    icon={<Calendar className="h-6 w-6 text-slate-400" />}
                />
                <SalesMetricCard
                    title="Last 7 Days Sales"
                    value={salesData.lastWeek.sales}
                    subValue={`৳${salesData.lastWeek.amount.toLocaleString()}`}
                    icon={<ShoppingCart className="h-6 w-6 text-slate-400" />}
                />
                <SalesMetricCard
                    title="Total Profit"
                    value={`৳${salesData.totalProfit.toLocaleString()}`}
                    subValue={`From ${salesData.totalSales} sales`}
                    icon={<DollarSign className="h-6 w-6 text-slate-400" />}
                />
                <SalesMetricCard
                    title="Sales Growth"
                    value="+12.5%"
                    subValue="Compared to last month"
                    icon={<TrendingUp className="h-6 w-6 text-slate-400" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <SalesChart data={monthlySales} />
                </div>
                <div>
                    <TopSellingProducts products={topProducts} />
                </div>
            </div>

            <div className="mt-8 text-center">
                <Button onClick={handleReportClick} loading={loading}>
                    Generate Detailed Report
                </Button>
            </div>
        </>
    );
}

function ProductsTab({ products }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <ul>
                {products.map((product, index) => (
                    <li key={index} className="mb-2">
                        {product.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function CustomersTab() {
    return <h2 className="text-2xl font-bold">Customers</h2>;
}

function TrendsTab() {
    return <h2 className="text-2xl font-bold">Trends</h2>;
}

function SalesMetricCard({ title, value, subValue, icon }) {
    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                {icon}
            </div>
            <div className="text-3xl font-bold">{value}</div>
            <div className="text-sm text-slate-500">{subValue}</div>
        </div>
    );
}

function SalesChart({ data }) {
    const chartData = {
        labels: data.map((_, index) => `Week ${index + 1}`),
        datasets: [
            {
                label: "Sales",
                data: data,
                borderColor: "#4F46E5",
                backgroundColor: "rgba(79, 70, 229, 0.2)",
                borderWidth: 2,
                fill: true,
            },
        ],
    };

    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
            <Line data={chartData} options={{ responsive: true }} />
        </div>
    );
}

function TopSellingProducts({ products }) {
    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
            <ul className="space-y-4">
                {products?.map((product, index) => (
                    <li key={index} className="flex justify-between items-center p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                        <span>{product?.productDetails.name}</span>
                        <span><span className="text-green-400 font-bold text-2xl">{product?.totalQuantitySold}</span> Sold</span>
                        {product.trend === "up" ? (
                            <TrendingDown className="h-5 w-5 text-red-500" />
                        ) : (
                            <TrendingUp className="h-5 w-5 text-green-500" />
                        )}
                    </li>
                ))}
            </ul>
        </div >
    );
}

function Button({ children, onClick, loading }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-md bg-blue-600 text-white ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
            disabled={loading}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}
