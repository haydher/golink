type Props = {
  state?: "error" | "loading" | "success";
};

export default function Error({ state }: Props): JSX.Element | null {
  if (state && state !== "error") {
    return null;
  }

  return (
    <div className="flex flex-col align-middle p-24">
      <p className="m-auto font-semibold text-2xl">Unexpected Error Occurred</p>
      <p className="m-auto font-light mt-6">{`possibly the rate limiter 😅`}</p>
    </div>
  );
}
