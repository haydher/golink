import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../Error";
import Loading from "./Loading";
import Repository from "./Repository";

type State = {
  createdAt: string;
  description: string;
  forks: number;
  id: number;
  language: string;
  name: string;
  stars: number;
  owner: string;
};

const ERROR = "error",
  LOADING = "loading",
  SUCCESS = "success";

export default function Repositories() {
  const [repositories, setRepositories] = useState<State[]>([]);
  const [state, setState] = useState<"error" | "loading" | "success">(SUCCESS);
  const { org } = useParams<{ org: string }>();

  useEffect(() => {
    const search = org || "netflix";

    const fetchRepositories = async () => {
      setState((prevValue) => (prevValue = LOADING));

      try {
        const response = await fetch(`https://api.github.com/users/${search}/repos`);
        const data = await response.json();

        if (response.status !== 200) {
          throw new Error();
        }

        const mappedResponse = mapResponse(data);
        mappedResponse?.sort((a: State, b: State) => b.stars - a.stars);

        setRepositories(mappedResponse);
        setState((prevValue) => (prevValue = SUCCESS));
      } catch (error) {
        setState((prevValue) => (prevValue = ERROR));
      }
    };

    fetchRepositories();
  }, [org]);

  function mapResponse(data: any) {
    return data.map((repository: any) => ({
      createdAt: repository.created_at,
      description: repository.description,
      forks: repository.forks_count,
      id: repository.id,
      language: repository.language,
      name: repository.name,
      stars: repository.stargazers_count,
      owner: repository.owner.login,
    }));
  }

  function getResults(): JSX.Element[] | null {
    if (!repositories.length || state !== SUCCESS) {
      return null;
    }

    return repositories?.map((repository) => <Repository key={repository.id} {...repository} />);
  }

  return (
    <div>
      <h1 className="text-lg font-medium mb-2">Repositories</h1>
      <ErrorMessage state={state} />
      <Loading state={state} />

      {getResults()}
    </div>
  );
}
