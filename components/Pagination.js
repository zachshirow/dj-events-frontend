import Link from "next/link";
import React from "react";

export default function Pagination({
	pagination: { page, pageCount, pageSize, total },
}) {
	return (
		<div className="text-center">
			{pageCount > 1 && (
				<div>
					<p>
						{page > 1 && (
							<Link href={`events?page=${page - 1}`}>
								<a className="btn-secondary">Prev</a>
							</Link>
						)}
						{page !== pageCount && (
							<Link href={`events?page=${page + 1}`}>
								<a className="btn-secondary">Next</a>
							</Link>
						)}
					</p>
					<p>
						page {page} of {pageCount}
					</p>
				</div>
			)}
		</div>
	);
}
