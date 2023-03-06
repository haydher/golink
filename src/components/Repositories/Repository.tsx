import { formatDate } from "../../utils";
import { Link } from "react-router-dom";

type Props = {
  readonly createdAt: string;
  readonly description: string;
  readonly forks: number;
  readonly id: number;
  readonly language: string;
  readonly name: string;
  readonly stars: number;
  readonly owner: string;
};

export default function Repository(props: Props): JSX.Element {
  return (
    <div className="border p-4 rounded-lg mb-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to={`/${props.owner}/commits/${props?.name}`}>
            <h1 className="font-medium mr-4 hover:underline">{props?.name}</h1>
          </Link>
          <p className="flex justify-center align-middle py-2 px-6 border rounded-full text-xs">PUBLIC</p>
        </div>

        <div className="flex items-center">
          <img src="/fork.png" alt="Star" className="mr-1 h-4" />
          <p className="mr-4">{props?.forks ?? 0}</p>

          <img src="/star.png" alt="Star" className="mr-1 h-4" />
          <p>{props?.stars ?? 0}</p>
        </div>
      </div>

      <p className="mb-2">{props?.description}</p>

      <div className="flex justify-between">
        <div className="flex items-center">
          <img
            className="mr-1 h-4 rounded-full"
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${props?.language?.toLowerCase()}/${props?.language?.toLowerCase()}-original.svg`}
            alt={props?.language}
          />

          <p>{props?.language}</p>
        </div>

        <p>{formatDate(props.createdAt)}</p>
      </div>
    </div>
  );
}
