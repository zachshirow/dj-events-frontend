import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";
import qs from "qs";
import { useRouter } from "next/router";

export default function SearchPage({ events }) {
	const router = useRouter();

	return (
		<Layout title={`Search Results for ${router.query.term}`}>
			<Link href="/events">← Go back</Link>
			<h1>Search Results for {router.query.term}</h1>
			{events.length === 0 && <h3>No Events to Show</h3>}
			{events.map((evt) => {
				return <EventItem key={evt.attributes.slug} evt={evt.attributes} />;
			})}
		</Layout>
	);
}

export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify(
		{
			filters: {
				$or: [
					{
						name: {
							$containsi: term,
						},
					},
					{
						performers: {
							$containsi: term,
						},
					},
					{
						description: {
							$containsi: term,
						},
					},
					{
						venue: {
							$containsi: term,
						},
					},
				],
			},
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
	};
}
