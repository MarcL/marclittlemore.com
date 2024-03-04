import type { Config } from "@netlify/functions"
import rebuildSite from '../../functions/rebuildSite.mts';

export default async (request: Request) => {
    await rebuildSite('Yearly rebuild to update footer');
};

// Run every year on the 1st of January at 00:30
export const config: Config = {
    schedule: "30 0 1 1 *"
};
