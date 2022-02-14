import Head from "next/head";
import styles from "../styles/Layout.module.css";

export default function Layout({ title, keywords, description, children }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
			</Head>
			<div className={styles.container}>{children}</div>
		</>
	);
}

Layout.defaultProps = {
	title: "DJ events | find the hottest parties",
	description: "Find the latest DJ and other musical events",
	keywords: "Music, DJ, edm, events",
};
