import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";
import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack";
// Root route file
import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Link,
	Outlet,
	Scripts,
	createRootRouteWithContext,
	useRouter,
} from "@tanstack/react-router";
import { Toaster } from "sonner";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import { ThemeInitScript } from "~/components/theme-init-script";
import { ThemeProvider } from "~/components/theme-provider";
import { authClient } from "~/lib/auth-client";
import { getTheme } from "~/lib/theme";
import type { Theme } from "~/lib/theme";
import { seo } from "~/utils/seo";
import appCss from "../styles/app.css?url";
import customCss from "../styles/custom.css?url";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	loader: () => getTheme(),
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title: "Instructa Start",
				description: "Instructa App Starter",
			}),
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "stylesheet",
				href: customCss,
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{ rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const initial = Route.useLoaderData() as Theme;
	const router = useRouter();

	return (
		<html lang="en" className={initial === "system" ? "" : initial}>
			<head>
				{/* Early theme application – prevents FOUC without react/no-danger noise */}
				<ThemeInitScript />
				<HeadContent />
			</head>
			<body className="">
				<AuthQueryProvider>
					<ThemeProvider initial={initial}>
						<AuthUIProviderTanstack
							authClient={authClient}
							redirectTo="/dashboard"
							navigate={(href) => router.navigate({ href })}
							replace={(href) => router.navigate({ href, replace: true })}
							Link={({ href, ...props }) => <Link to={href} {...props} />}
						>
							<div className="flex min-h-svh flex-col">{children}</div>
							<Toaster />
						</AuthUIProviderTanstack>
					</ThemeProvider>
				</AuthQueryProvider>
				<Scripts />
			</body>
		</html>
	);
}
