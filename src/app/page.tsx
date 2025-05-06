import { getSearchResults } from "@/psn/api";

export default async function Home() {
  const { data } = await getSearchResults("forza");

  return <div>{JSON.stringify(data)}</div>;
}
