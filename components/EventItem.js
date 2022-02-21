import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
	let { name, date, time, slug } = evt;

	date = new Date(date).toLocaleDateString("en-US");

	const image = evt.image.data.attributes.formats.small.url;

	return (
		<div className={styles.event}>
			<div className={styles.img}>
				<Image
					src={image ? image : "/images/event-default.png"}
					alt={name}
					height={100}
					width={170}
				/>
			</div>
			<div className={styles.info}>
				<span>
					{date} at {time}
				</span>
				<h3>{name}</h3>
			</div>
			<div className={styles.link}>
				<Link href={`/events/${slug}`}>
					<a className="btn">Details →</a>
				</Link>
			</div>
		</div>
	);
}
