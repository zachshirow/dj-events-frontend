import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function EventPage() {
	return (
		<Layout>
			<Link href="/events/">← See All Events</Link>
			<h1>My event</h1>
		</Layout>
	);
}
