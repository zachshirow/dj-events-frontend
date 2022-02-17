import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

export default function EventsPage({ events }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No Events to Show</h3>}
			{events.map((evt) => {
				return <EventItem key={evt.slug} evt={evt} />;
			})}
		</Layout>
	);
}

export async function getStaticProps() {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();

	return {
		props: { events },
		revalidate: 1,
	};
}
