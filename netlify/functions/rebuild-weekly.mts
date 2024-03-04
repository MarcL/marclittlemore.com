import type { Config } from "@netlify/functions"
import rebuildSite from '../../functions/rebuildSite.mts';

export default async (request: Request) => {
    await rebuildSite('Weekly rebuild to update newsletter and blog posts');
};

// Run every week on Saturday at 10:30
export const config: Config = {
    schedule: "30 10 * * 6"
};
