'use client';

import React, { useState, useEffect } from 'react';
import { getRates } from '../../utils/getRates';
import styles from './CurrencyConverter.module.css'; // Ensure you have this CSS module

const CurrencyCounter = () => {
    const [rates, setRates] = useState<{ USD: number; EUR: number; UAH: number } | null>(null);
    const [amount1, setAmount1] = useState<string>(''); // Start with an empty string
    const [amount2, setAmount2] = useState<string>(''); // Start with an empty string
    const [currency1, setCurrency1] = useState<string>('UAH');
    const [currency2, setCurrency2] = useState<string>('USD');

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const data = await getRates('UAH'); // Base currency
                console.log(data.rates, 1)
                setRates(data.rates);
            } catch (e) {
                console.error('Error fetching rates:', e);
            }
        };
        fetchRates();
    }, []);

    const convertCurrency = (amount: string, fromCurrency: string, toCurrency: string): string => {
        if (!rates || amount === '') return '';
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) return '';

        if (fromCurrency === toCurrency) return amount;

        const baseAmount = numericAmount / rates[fromCurrency];
        return (baseAmount * rates[toCurrency]).toFixed(5); // Round to two decimal places
    };

    const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // Get the input value directly
        setAmount1(value);
        setAmount2(convertCurrency(value, currency1, currency2)); // Update conversion
    };

    const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // Get the input value directly
        setAmount2(value);
        setAmount1(convertCurrency(value, currency2, currency1)); // Update conversion
    };

    const handleCurrency1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = e.target.value;
        setCurrency1(newCurrency);
        setAmount2(convertCurrency(amount1, newCurrency, currency2)); // Update conversion
    };

    const handleCurrency2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = e.target.value;
        setCurrency2(newCurrency);
        setAmount1(convertCurrency(amount2, currency1, newCurrency)); // Update conversion
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Currency Converter</h2>
            <div className={styles.converter}>
                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        value={amount1} // Directly use the string state
                        onChange={handleAmount1Change}
                        placeholder="Enter amount"
                        className={styles.input}
                        min="0" // Ensure only non-negative values
                    />
                    <select value={currency1} onChange={handleCurrency1Change} className={styles.select}>
                        <option value="UAH">UAH</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        value={amount2} // Directly use the string state
                        onChange={handleAmount2Change}
                        placeholder="Enter amount"
                        className={styles.input}
                        min="0" // Ensure only non-negative values
                    />
                    <select value={currency2} onChange={handleCurrency2Change} className={styles.select}>
                        <option value="UAH">UAH</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CurrencyCounter;
