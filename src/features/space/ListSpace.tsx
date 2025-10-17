import Error from "../../components/Error";
import { Loader } from "../../components/Loader";
import SpaceCard from "../../components/SpaceCard";
import { useSearch } from "../../hooks/useSearchHook";

function ListSpace() {
  const { searchResults, loading, error } = useSearch();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full">
        <Error />
      </div>
    );
  }

  if (!searchResults || searchResults.length === 0) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        No spaces found.
      </div>
    );
  }

  return (
    <div
      className="
    grid 
    grid-cols-1 
    sm:grid-cols-3 
    lg:grid-cols-2 
    xl:grid-cols-2 
    gap-6 
    p-4
  "
    >
      {searchResults.map((space) => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  );
}

export default ListSpace;
