export const useSaveAlgoliaRecord = async (record: object, indexName: string) => {
  try {
    const { data, error } = await useFetch("/api/algolia/save-algolia-record", {
      method: "POST",
      body: {
        record,
        indexName,
      },
    });

    if (error.value) {
      console.error("Error saving record to Algolia:", error.value);
    } else {
      console.log("Record saved to Algolia:");
    }
  } catch (error) {
    console.error("Error while saving record to Algolia:", error);
  }
};