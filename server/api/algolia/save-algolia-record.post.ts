import {algoliasearch} from "algoliasearch";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { record, indexName } = body;

    const appId = process.env.NUXT_PUBLIC_ALGOLIA_APP_ID as string;
    const apiKey = process.env.ALGOLIA_ADMIN_API_KEY as string;

    const client = algoliasearch(appId, apiKey);

    const { taskID } = await client.saveObject({
        indexName,
        body: record,
    });

    return { success: true, taskID };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
});
