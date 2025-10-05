import styles from "./page.module.css";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar/>
      HELLO
    </div>
  );
}
