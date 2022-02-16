import Layout from "@/components/Layout";
import styles from "@/styles/404.module.css";
import Link from "next/link";

export default function NotFoundPage() {
	return (
		<Layout>
			<div className={styles.error}>
				<h1>404</h1>
				<h4>Sorry, there is nothing here</h4>
				<Link href="/">Go back home &#8594;</Link>
			</div>
		</Layout>
	);
}
