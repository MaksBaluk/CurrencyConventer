'use client';

import React, {useState, useEffect} from 'react';
import {getRates} from '../../utils/getRates';
import styles from './CurrencyConverter.module.css';

interface Rates {
    USD: number;
    EUR: number;
    UAH: number;
    PLN: number;
}

const CurrencyCounter: React.FC = () => {
    const [rates, setRates] = useState<Rates | null>(null);
    const [amount1, setAmount1] = useState<string>('');
    const [amount2, setAmount2] = useState<string>('');
    const [currency1, setCurrency1] = useState<string>('UAH');
    const [currency2, setCurrency2] = useState<string>('USD');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const data = await getRates('UAH');
                setRates(data.rates);
            } catch (e) {
                setError('Failed to fetch rates. Please try again later.');
                console.error('Error fetching rates:', e);
            }
        };
        fetchRates();
    }, []);

    const convertCurrency = (amount: string, fromCurrency: string, toCurrency: string): string => {
        if (!rates || amount === '') return '';
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount < 0) return '';

        if (fromCurrency === toCurrency) return amount;

        const baseAmount = numericAmount / rates[fromCurrency];
        return (baseAmount * rates[toCurrency]).toFixed(3);
    };

    const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount1(value);
        setAmount2(convertCurrency(value, currency1, currency2));
    };

    const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount2(value);
        setAmount1(convertCurrency(value, currency2, currency1));
    };

    const handleCurrency1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = e.target.value;
        setCurrency1(newCurrency);
        setAmount2(convertCurrency(amount1, newCurrency, currency2));
    };

    const handleCurrency2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = e.target.value;
        setCurrency2(newCurrency);
        setAmount1(convertCurrency(amount2, currency1, newCurrency));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Currency Converter</h2>
            <p className={styles.description}>Convert between different currencies.</p>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.converter}>
                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        value={amount1}
                        onChange={handleAmount1Change}
                        placeholder="Enter amount"
                        className={styles.input}
                        min="0"
                    />
                    <select value={currency1} onChange={handleCurrency1Change} className={styles.select}>
                        <option value="UAH">UAH</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="PLN">PLN</option>
                    </select>
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="number"
                        value={amount2}
                        onChange={handleAmount2Change}
                        placeholder="Enter amount"
                        className={styles.input}
                        min="0"
                    />
                    <select value={currency2} onChange={handleCurrency2Change} className={styles.select}>
                        <option value="UAH">UAH</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="PLN">PLN</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default CurrencyCounter;
