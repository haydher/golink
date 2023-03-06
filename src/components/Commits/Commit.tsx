import { formatDate } from "../../utils";
import Card from "../Card";

type Props = {
  readonly author: string;
  readonly avatar: string;
  readonly date: string;
  readonly message: string;
  readonly sha: string;
};

export default function Commit({ sha, author, message, date, avatar }: Props) {
  return (
    <Card>
      <div className="flex justify-between items-center">
        <div className="flex items-center mb-2">
          <img alt="user's avatar" className="mr-2 h-8 rounded-full" src={avatar} />
          <h1>{author}</h1>
        </div>

        <p>{formatDate(date)}</p>
      </div>

      <p className="mb-2">{message}</p>
      <p className="font-light text-sm">{sha}</p>
    </Card>
  );
}
