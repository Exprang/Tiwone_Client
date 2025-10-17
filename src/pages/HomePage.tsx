import React from "react";
import { Home, Briefcase, User, Phone, Search, MapPin } from "lucide-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-5 md:px-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Find Your Dream Property in Zambia
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Buy, Rent, Lease or List Your Property Effortlessly
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search by city, neighborhood, or property type"
            className="w-full md:flex-1 px-4 py-3 rounded-md border border-gray-200 focus:outline-none"
          />
          <select className="px-4 py-3 rounded-md border border-gray-200">
            <option value="all">All</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="lease">Lease</option>
          </select>
          <button className="bg-yellow-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-yellow-600 transition">
            <Search className="inline w-5 h-5 mr-2" /> Search
          </button>
        </div>
      </section>

      {/* Quick Links / Categories */}
      <section className="py-16 px-5 md:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          {
            name: "For Sale",
            icon: <Home className="w-10 h-10 mx-auto mb-2" />,
          },
          {
            name: "For Rent",
            icon: <Briefcase className="w-10 h-10 mx-auto mb-2" />,
          },
          { name: "Lease", icon: <User className="w-10 h-10 mx-auto mb-2" /> },
          {
            name: "List Property",
            icon: <Phone className="w-10 h-10 mx-auto mb-2" />,
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer"
          >
            {item.icon}
            <h3 className="font-semibold text-lg mt-2">{item.name}</h3>
          </div>
        ))}
      </section>

      {/* Featured Properties */}
      <section className="py-16 px-5 md:px-20">
        <h2 className="text-3xl font-bold mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Property Card */}
          {[1, 2, 3, 4, 5, 6].map((prop) => (
            <div
              key={prop}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={`https://source.unsplash.com/400x300/?house,building,apartment,real-estate&sig=${prop}`}
                alt="Property"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-xl mb-2">
                  Luxury Apartment {prop}
                </h3>
                <p className="text-gray-600 mb-2">Lusaka, Zambia</p>
                <p className="font-bold text-blue-600">USD 120,000</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-100 py-16 px-5 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold text-xl mb-2">Verified Listings</h3>
            <p>All properties are verified for authenticity and safety.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold text-xl mb-2">Trusted Agents</h3>
            <p>Connect with certified real estate professionals in Zambia.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold text-xl mb-2">Easy Transactions</h3>
            <p>Secure and transparent payment and lease processes.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-5 md:px-20 text-center bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Find Your Property?
        </h2>
        <p className="mb-6">List your property or search our database today.</p>
        <button className="bg-yellow-500 px-8 py-3 rounded-md font-semibold hover:bg-yellow-600 transition">
          Get Started
        </button>
      </section>
    </div>
  );
}

export default HomePage;
