import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function HomePage({ events }) {
	return (
		<Layout>
			<h1>Upcoming Events</h1>
			{events.length === 0 && <h3>No Events to Show</h3>}
			{events.map((evt) => {
				return <EventItem key={evt.slug} evt={evt} />;
			})}
			<br />
			{events.length > 0 && (
				<p align="center">
					<Link href="/events">
						<a className="btn-secondary">See All Events →</a>
					</Link>
				</p>
			)}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();

	return {
		props: { events: events.slice(0, 3) },
		revalidate: 1,
	};
}
