'use client';

import React, { useState, useEffect } from "react";
import { getRates } from '../../utils/getRates';
import styles from './Header.module.css';

interface Rates {
    USD: number;
    EUR: number;
}

const Header: React.FC = () => {
    const [rates, setRates] = useState<Rates | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRates = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getRates('UAH');
                setRates({ USD: data.rates.USD, EUR: data.rates.EUR });
            } catch (e) {
                setError('Error fetching rates. Please try again later.');
                console.error('Error fetching rates:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchRates();
    }, []);

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>Currency Converter</h1>
            {loading ? (
                <h2 className={styles.loading}>Fetching latest rates...</h2>
            ) : error ? (
                <h2 className={styles.error}>{error}</h2>
            ) : (
                <div className={styles.rates}>
                    <p>USD to UAH: {rates?.USD}</p>
                    <p>EUR to UAH: {rates?.EUR}</p>
                </div>
            )}
        </div>
    );
};

export default Header;
