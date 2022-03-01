import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Search from "./Search";
import { FaSignInAlt } from "react-icons/fa";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export default function Header({ children }) {
	const { user, logout } = useContext(AuthContext);

	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<Link href="/">
					<a>DJ Events</a>
				</Link>
			</div>
			<Search />
			<nav>
				<ul>
					<li>
						<Link href="/events">
							<a>Events</a>
						</Link>
					</li>
					{user ? (
						<>
							<li>
								<Link href="/events/add">
									<a>Add Event</a>
								</Link>
							</li>
							<li>
								<Link href="/account/dashboard">
									<a>Dashboard</a>
								</Link>
							</li>
						</>
					) : (
						<></>
					)}
					{user ? (
						// if logged in
						<>
							<li>
								<button
									onClick={() => logout()}
									className="btn-secondary btn-icon"
									href="/account/login">
									<FaSignInAlt /> Logout
								</button>
							</li>
						</>
					) : (
						// if logged out
						<>
							<li>
								<Link href="/account/login">
									<a className="btn-secondary btn-icon">
										<FaSignInAlt /> Login
									</a>
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}
