import { init } from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

export const initSentry = (): void => {
	init({
		dsn: "https://3d8fe79d7e1741b2b2838f156f902404@o1231325.ingest.sentry.io/6378654",
		integrations: [new BrowserTracing()],
		tracesSampleRate: 1.0,
	});
};
