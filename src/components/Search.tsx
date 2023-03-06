import { useState } from "react";
import { useDebounce } from "../utils";
import { Link } from "react-router-dom";

type SearchType = {
  readonly name: string;
  readonly id: number;
  readonly avatar: string;
};

export default function Search(): JSX.Element {
  const [fetching, setFetching] = useState<boolean>(false);
  const [results, setResults] = useState<SearchType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);

  const debounce = useDebounce((query: string) => getSearchResults(query), 500);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);

    if (event.target.value.length > 2) {
      setFetching(true);
      debounce(event.target.value);
    }
  }

  async function getSearchResults(search: string) {
    const response = await fetch(`https://api.github.com/search/users?q=${search}+type:org`);
    const data = await response.json();

    const mapResponse = data.items.map((item: any) => ({
      name: item?.login,
      id: item?.id,
      avatar: item?.avatar_url,
    }));

    setResults(mapResponse);
    setFetching(false);
  }

  function getLoading() {
    if (!fetching || !showResults) {
      return null;
    }

    return (
      <ul className="absolute -top-100 w-full bg-slate-200 rounded-lg p-2">
        {[1, 2, 3, 4].map((result) => {
          return (
            <li className="flex items-center p-2 rounded-lg" key={result}>
              <div className="animate-pulse flex h-8 w-8 mr-2 bg-gray-400 rounded-full" />
              <div className="animate-pulse flex-1 h-4 bg-gray-400 rounded" />
            </li>
          );
        })}
      </ul>
    );
  }

  function getResults() {
    if (!results.length || fetching || !showResults) {
      return null;
    }

    return (
      <ul className="absolute -top-100 w-full bg-slate-200 rounded-lg p-2 h-72 overflow-auto">
        {results.map((result) => {
          return (
            <Link to={`/${result.name}`} key={result.id}>
              <li
                className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-white"
                onMouseDown={(event) => event.preventDefault()}
              >
                <img alt={`Icon for ${result.name}`} className="flex h-8 w-8 mr-2" src={result.avatar} />
                {result.name}
              </li>
            </Link>
          );
        })}
      </ul>
    );
  }

  return (
    <div
      className="relative z-50 w-40 sm:w-72"
      onFocus={() => setShowResults(true)}
      onBlur={() => setShowResults(false)}
    >
      <input
        placeholder="Search Organizations..."
        className="border border-gray-900 rounded-md p-1 px-2 mb-2 w-full"
        onChange={(event) => handleChange(event)}
        type="search"
        value={search}
      />

      {getLoading()}

      {getResults()}
    </div>
  );
}
