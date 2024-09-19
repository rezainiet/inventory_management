/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react';

export default function CheckBalance() {
    const [balance, setBalance] = useState(null);  // State to store balance
    const [loading, setLoading] = useState(true);  // State to handle loading
    const [error, setError] = useState(null);      // State to handle errors

    // Access environment variables directly
    const API_KEY = 'xy5p4dgkucgaybm3qmtygyujkcbg1o2u';
    const SECRET_KEY = '78enjakzlyfqva8w5plsoo3h';

    console.log('API Key:', API_KEY);
    console.log('Secret Key:', SECRET_KEY);

    useEffect(() => {
        // Define an async function to fetch balance
        const fetchBalance = async () => {
            try {
                const response = await fetch('https://portal.packzy.com/api/v1/get_balance', {
                    method: 'GET',
                    headers: {
                        'Api-Key': API_KEY,
                        'Secret-Key': SECRET_KEY,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const data = await response.json();
                setBalance(data.current_balance);  // Update balance state
            } catch (error) {
                setError(error.message);  // Set error if API call fails
            } finally {
                setLoading(false);  // Stop loading after request
            }
        };

        fetchBalance();  // Call the async function on component mount
    }, [API_KEY, SECRET_KEY]);  // Add API_KEY and SECRET_KEY as dependencies

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Current Balance</h1>
            {balance !== null ? <p>Your current balance is: {balance}</p> : <p>No balance available.</p>}
        </div>
    );
}
