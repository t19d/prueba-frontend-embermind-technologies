"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface LinkMenuProps {
	text: string;
	href?: string;
}

export default function LinkMenu({ text, href }: LinkMenuProps) {
	let className = "link";
	const pathname = usePathname();
	let isCurrentPage = pathname === href;
	if (isCurrentPage) className += " current-page";

	return (
		<Link href={href ?? "#"} className={className}>
			<span>{text}</span>
		</Link>
	);
}
