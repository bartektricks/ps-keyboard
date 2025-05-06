import { getSearchResults } from "@/psn-api";

export default async function Home() {
  const { data } = await getSearchResults("forza");

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
