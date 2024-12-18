import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartOne = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Day');
    const [series] = useState({
        day: [
            { name: 'Product One', data: Array(30).fill().map(() => Math.floor(Math.random() * 50)) }, // Random data
            { name: 'Product Two', data: Array(30).fill().map(() => Math.floor(Math.random() * 70)) },
        ],
        week: [
            { name: 'Product One', data: [150, 120, 130, 180, 100, 140, 160] },
            { name: 'Product Two', data: [200, 180, 190, 220, 170, 210, 230] },
        ],
        month: [
            { name: 'Product One', data: [700, 800, 750, 850, 900, 920] },
            { name: 'Product Two', data: [820, 950, 890, 1020, 1040, 1100] },
        ],
    });

    const generateLastDays = (numDays) => {
        const dates = [];
        for (let i = numDays - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            dates.push(`${month}/${day}`);
        }
        return dates;
    };

    const xaxisCategories = {
        day: generateLastDays(30),
        week: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    };

    const calculateMaxY = (data) => {
        const allDataPoints = data.flatMap(series => series.data);
        return Math.max(...allDataPoints) * 1.1; // Increase by 10%
    };

    const options = {
        legend: {
            show: false,
            position: 'top',
            horizontalAlign: 'left',
        },
        colors: ['#3C50E0', '#80CAEE'],
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            height: 335,
            type: 'area',
            dropShadow: {
                enabled: true,
                color: '#623CEA14',
                top: 10,
                blur: 4,
                left: 0,
                opacity: 0.1,
            },
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: [2, 2],
            curve: 'straight',
        },
        grid: {
            xaxis: {
                lines: {
                    show: true,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 4,
            colors: '#fff',
            strokeColors: ['#3056D3', '#80CAEE'],
            strokeWidth: 3,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            hover: {
                sizeOffset: 5,
            },
        },
        xaxis: {
            type: 'category',
            categories: xaxisCategories[selectedPeriod.toLowerCase()],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            min: 0,
            max: calculateMaxY(series[selectedPeriod.toLowerCase()]), // Dynamic Y-axis scaling
        },
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
                <div className="flex w-full flex-wrap gap-3 sm:gap-5">
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-primary">Total Revenue</p>
                            <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
                        </div>
                    </div>
                    <div className="flex min-w-47.5">
                        <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
                            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
                        </span>
                        <div className="w-full">
                            <p className="font-semibold text-secondary">Total Sales</p>
                            <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-45 justify-end">
                    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
                        {['Day', 'Week', 'Month'].map((period) => (
                            <button
                                key={period}
                                className={`rounded py-1 px-3 text-xs font-medium ${selectedPeriod === period
                                    ? 'bg-primary text-white'
                                    : 'text-black hover:bg-white dark:text-white dark:hover:bg-boxdark'
                                    }`}
                                onClick={() => handlePeriodChange(period)}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={series[selectedPeriod.toLowerCase()]}
                        type="area"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartOne;
