import { Key, Mail } from "lucide-react";
import Form from "../../components/Form";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import Illustrator from "../../components/Illustrator";
import { useState } from "react";
import type { LoginRequest } from "../../types/auth";
import { useUser } from "../../hooks/useAuth";
import { getFieldError } from "../../utils/Helper";

function SigninPage() {
  const { loading, error, login } = useUser();

  const [email, setEmail] = useState<string>("user@example.com");
  const [password, setPassword] = useState<string>("usertest123");

  const handleSubmit = async () => {
    const user: LoginRequest = { email, password };
    login(user);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gray-50">
      {/* Left Illustration Panel */}
      <div className="hidden lg:flex flex-col justify-center items-center">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Our Community
          </h2>
          <p className="text-gray-600">
            Manage your property listings and explore opportunities with ease.
          </p>
        </div>
        <div className="mt-8 w-3/4 h-72 rounded-sm flex items-center justify-center text-gray-500">
          <Illustrator src="./b7.svg" alt="signin illustration" width="60%" />
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center items-center p-4">
        <Form
          className="w-full max-w-sm p-4 rounded-sm"
          onSubmit={handleSubmit}
        >
          <fieldset className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm">
              Enter your credentials to start living life.
            </p>
          </fieldset>

          <InputField
            name="email"
            icon={<Mail />}
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={getFieldError("email", error)}
          />
          <InputField
            name="password"
            icon={<Key />}
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            error={getFieldError("password", error)}
          />

          {/* Forgot Password Link */}
          <div className="text-right mt-1">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-sm font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Sign In
          </button>

          <div className="text-sm text-gray-500 text-center mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="inline-block text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SigninPage;
