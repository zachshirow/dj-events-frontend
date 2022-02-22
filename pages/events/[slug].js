import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import QueryString from "qs";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

import { API_URL } from "@/config/index.js";
import styles from "@/styles/Event.module.css";

export default function EventPage({ evt }) {
	function deleteEvent(e) {
		console.log("delete");
	}

	const id = evt.id;

	let { name, date, time, slug, performers, description, venue, address } =
		evt.attributes;

	date = new Date(date).toLocaleDateString("en-US");
	console.log("image");

	let image = false;
	if (evt.attributes.image.data !== null) {
		image = evt.attributes.image.data.attributes.formats.medium.url;
	}

	return (
		<Layout>
			<Link href="/events/">
				<a className={styles.back}>← Go Back</a>
			</Link>
			<div className={styles.event}>
				<div className={styles.controls}>
					<Link href={`/events/edit/${id}`}>
						<a>
							<FaPencilAlt /> Edit Event
						</a>
					</Link>
					<a href="#" className={styles.delete} onClick={deleteEvent}>
						<FaTimes /> Delete Event
					</a>
				</div>

				<span>
					{date} at {time}
				</span>
				<h1>{name}</h1>

				{image && (
					<div className={styles.image}>
						<Image
							src={image ? image : "/images/event-default.png"}
							alt={name}
							width={960}
							height={600}
						/>
					</div>
				)}

				<h3>Performers</h3>
				<p>{performers}</p>
				<h3>Description</h3>
				<p>{description}</p>
				<h3>Venue: {venue}</h3>
				<p>{address}</p>
			</div>
		</Layout>
	);
}

export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/api/events`);
	const resJson = await res.json();
	const events = resJson.data;

	const paths = events.map((evt) => {
		return { params: { slug: evt.attributes.slug } };
	});

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const query = QueryString.stringify(
		{
			filters: {
				slug: {
					$eq: slug,
				},
			},
			populate: "image",
		},
		{
			encodeValuesOnly: true,
		}
	);

	const res = await fetch(`${API_URL}/api/events?${query}`);

	const resJson = await res.json();
	const events = resJson.data;
	return { props: { evt: events[0] }, revalidate: 1 };
}

// export async function getServerSideProps({ query: { slug } }) {
// 	const res = await fetch(`${API_URL}/api/events/${slug}`);

// 	const events = await res.json();

// 	return { props: { evt: events[0] } };
// }
