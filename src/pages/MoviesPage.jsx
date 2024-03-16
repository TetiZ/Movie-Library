import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("query") ?? "";
  const changeQuery = (newQuery) => {
    params.set("query", newQuery);
    setParams(params);
  };
  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          changeQuery(e.target.value);
        }}
      ></input>
    </>
  );
}
