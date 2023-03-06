import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Search from "./Search";

type State = {
  readonly avatar: string;
  readonly name: string;
};

export default function Header() {
  const location = useLocation();
  const org = location?.pathname?.split("/")[1];

  const [organization, setOrganization] = useState<State>({
    avatar: "https://avatars.githubusercontent.com/u/913567?v=4",
    name: org || "Netflix",
  });

  useEffect(() => {
    const orgName = org || "netflix";

    const fetchOrg = async () => {
      const response = await fetch(`https://api.github.com/orgs/${orgName}`);
      const data = await response.json();

      setOrganization({
        avatar: data.avatar_url,
        name: data.name,
      });
    };

    fetchOrg();
  }, [org]);

  return (
    <div className="flex justify-between py-4">
      <div className="flex items-center">
        <img alt="App logo" className="mr-2 h-12 w-12" src={organization?.avatar} />
        <h1 className="font-medium text-xl">{organization?.name ?? org}</h1>
      </div>

      <Search />
    </div>
  );
}
