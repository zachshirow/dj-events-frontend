import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from "qs";

export default function EventsPage({ events }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No Events to Show</h3>}
			{events.map((evt) => {
				return <EventItem key={evt.attributes.slug} evt={evt.attributes} />;
			})}
		</Layout>
	);
}

export async function getStaticProps() {
	const query = qs.stringify(
		{
			sort: ["id:DESC"],
			populate: "image",
		},
		{
			encodeValuesOnly: true,
		}
	);

	const res = await fetch(`${API_URL}/api/events?${query}`);
	const resJson = await res.json();
	const events = resJson.data;

	return {
		props: { events },
		revalidate: 1,
	};
}
