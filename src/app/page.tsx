import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/app/components/Header/Header";
import CurrencyConverter from "@/app/components/CurrencyConverter/CurrencyConverter";
export default function Home() {
  return (
    <div className={styles.page}>
        <Header/>
        <CurrencyConverter/>
    </div>
  );
}
