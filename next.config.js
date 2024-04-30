/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		URL: process.env.SITE_URL,
		DEPLOY_URL: process.env.SITE_URL,
		SITE_URL: process.env.SITE_URL,
		WHITELABEL: process.env.WHITELABEL,
		ANONYMOUS_SIGNIN_ENABLED: process.env.ANONYMOUS_SIGNIN_ENABLED,
		GOOGLE_SIGNIN_ENABLED: process.env.GOOGLE_SIGNIN_ENABLED,
		MICROSOFT_SIGNIN_ENABLED: process.env.MICROSOFT_SIGNIN_ENABLED,
		MAGICLINK_SIGNIN_ENABLED: process.env.MAGICLINK_SIGNIN_ENABLED,
	},
	productionBrowserSourceMaps: true,
	images: {
		domains: ["lh3.googleusercontent.com"],
	},
};

module.exports = nextConfig;
