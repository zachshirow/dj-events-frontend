import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import qs from "qs";

import Pagination from "@/components/Pagination";

export default function EventsPage({ events, pagination }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 && <h3>No Events to Show</h3>}
			{events.map((evt) => {
				return <EventItem key={evt.attributes.slug} evt={evt.attributes} />;
			})}
			<Pagination pagination={pagination} />
		</Layout>
	);
}

export async function getServerSideProps({ query: { page = 1 } }) {
	const query = qs.stringify(
		{
			sort: ["id:DESC"],
			populate: "image",
			pagination: {
				page: page,
				pageSize: PER_PAGE,
			},
		},
		{
			encodeValuesOnly: true,
		}
	);

	const res = await fetch(`${API_URL}/api/events?${query}`);
	const resJson = await res.json();
	const events = resJson.data;
	const pagination = resJson.meta.pagination;

	return {
		props: { events, pagination },
	};
}
