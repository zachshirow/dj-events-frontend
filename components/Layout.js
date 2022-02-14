import Head from "next/head";
import styles from "../styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
export default function Layout({ title, keywords, description, children }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<Header />
			<div className={styles.container}>{children}</div>
			<Footer />
		</>
	);
}

Layout.defaultProps = {
	title: "DJ events | find the hottest parties",
	description: "Find the latest DJ and other musical events",
	keywords: "Music, DJ, edm, events",
};
