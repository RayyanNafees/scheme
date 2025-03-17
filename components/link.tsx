import { twi, twj } from "tw-to-css";
import type {ReactNode} from 'preact/compat'
export const Link = ({
	children,
	href,
	blue = false,
	underline = true,
	external = false,
}:{
	href: string;
	blue?: boolean;
	underline?: boolean;
	external?: boolean;
	children?: ReactNode;
}) => (
	<a
		href={href}
		style={{
			color: blue ? "#017fc0" : twi`text-sky-400`,
			textDecoration: underline && "underline",
			...twj("text-md "),
		}}
		target={external ? "_blank" : "_self"}
	>
		<span style={twi`flex items-center gap-1`}>
			{children}
			{external && (
				<img
					src="https://api.iconify.design/line-md:external-link.svg?color=grey"
					style={twi`h-4 w-4 pt-px`}
					alt="external link"
				/>
			)}
		</span>
	</a>
);
