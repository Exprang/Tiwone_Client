import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

function WorkLayout() {
  return (
    <div className="flex flex-col h-screen">
      {/* Header always at top */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: hidden on mobile, shown on tablet+ */}
        <aside className="hidden md:flex md:flex-shrink-0 w-64 bg-gray-100 border-r">
          <Sidebar />
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-white p-4">
          <Main />
        </main>
      </div>
    </div>
  );
}

export default WorkLayout;
