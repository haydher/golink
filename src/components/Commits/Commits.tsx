import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Commit from "./Commit";
import ErrorMessage from "../Error";
import Loading from "../Repositories/Loading";

type State = {
  readonly author: string;
  readonly avatar: string;
  readonly date: string;
  readonly message: string;
  readonly sha: string;
};

const ERROR = "error",
  LOADING = "loading",
  SUCCESS = "success";

export default function Commits(): JSX.Element {
  const [commits, setCommits] = useState<State[]>([]);
  const [state, setState] = useState<"error" | "loading" | "success">(SUCCESS);
  const { org, repository } = useParams<{ org: string; repository: string }>();

  useEffect(() => {
    const fetchCommits = async () => {
      setState((prevValue) => (prevValue = LOADING));

      try {
        const response = await fetch(`https://api.github.com/repos/${org}/${repository}/commits`);
        const data = await response.json();

        if (response.status !== 200) {
          throw new Error();
        }

        const mappedResponse = mapResponse(data);

        setCommits(mappedResponse);
        setState((prevValue) => (prevValue = SUCCESS));
      } catch (error) {
        setState((prevValue) => (prevValue = ERROR));
      }
    };

    fetchCommits();
  }, []);

  function mapResponse(data: any) {
    return data.map((commit: any) => ({
      author: commit.commit.author.name,
      avatar: commit.author?.avatar_url ?? "",
      date: commit.commit.author.date,
      message: commit.commit.message,
      sha: commit.sha,
    }));
  }

  function getResults() {
    if (!commits.length || state !== SUCCESS) {
      return null;
    }

    return commits.map((commit) => <Commit key={commit.sha} {...commit} />);
  }

  return (
    <div>
      <h1 className="text-lg font-medium mb-2">Commits: {repository} </h1>
      <ErrorMessage state={state} />
      <Loading state={state} />

      {getResults()}
    </div>
  );
}
