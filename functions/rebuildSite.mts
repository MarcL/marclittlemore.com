declare var process : {
    env: {
        NETLIFY_REBUILD_HOOK: string
    }
}

export default async (triggerTitle: string) => {
    const url = new URL(process.env.NETLIFY_REBUILD_HOOK);
    url.searchParams.append('trigger_title', triggerTitle);

    return await fetch(url.toString(), {
        method: 'POST',
    });
};
