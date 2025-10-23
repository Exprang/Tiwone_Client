import Error from "../components/Error";
import { Loader } from "../components/Loader";
import SpaceCard from "../components/SpaceCard";
import { useSpace } from "../hooks/useSpaceHook";
import CreateProperty from "../features/listing/CreateProperty";
import { useEffect } from "react";
import type { PropertyItem } from "../types/space";
// import type { PropertyItem } from "../types/space";

// Dashboard Component
function Dashboard() {
  const { spaces, loading, error, readSpaces, deleteSpace } = useSpace();
  // const [propertyItem, setPropertyItem] = useState<PropertyItem[]>([]);

  useEffect(() => {
    readSpaces();
  }, [readSpaces]);

  // Loading state
  if (loading && !error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // Error state
  if (!loading && error) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Error />
      </div>
    );
  }

  // Empty state: no spaces
  if (spaces?.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-8">
        <div className="text-lg font-medium text-gray-600">
          No spaces listed
        </div>
        <CreateProperty />
      </div>
    );
  }

  const handleDelete = async (id: number) => {
    deleteSpace(id);
  };
  const handleEdit = async (space: PropertyItem) => {
    console.log(space);
  };

  // Normal state: display spaces in a grid
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 overflow-x-hidden overflow-y-scroll relative">
      {spaces &&
        spaces.map((space) => (
          // <div>{space.name}</div>
          <SpaceCard
            onDelete={handleDelete}
            onEdit={handleEdit}
            key={space.id}
            space={space}
            useCase="owner"
          />
        ))}

      {/* Floating Add Property Button */}
      <CreateProperty />
    </div>
  );
}

export default Dashboard;
