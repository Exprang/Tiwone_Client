import { Key, Mail, User } from "lucide-react";
import Form from "../../components/Form";
import InputField from "../../components/InputField";
import { Link } from "react-router-dom";
import Illustrator from "../../components/Illustrator";
import { useUser } from "../../hooks/useAuth";
import type { SignupRequest } from "../../types/auth";
import { useState } from "react";
import { getFieldError } from "../../utils/Helper";

function SignupPage() {
  const { loading, error, signup } = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async () => {
    const user: SignupRequest = {
      email,
      password,
      username: name,
      confirm: confirmPassword,
    };
    signup(user);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2 bg-gray-50">
      {/* Left Illustration / Info Panel */}
      <div className="hidden lg:flex flex-col justify-center items-center ">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600">
            Join the community and start listing, renting, or buying properties
            with ease.
          </p>
        </div>
        <div className="mt-8 w-3/4 h-72 rounded-sm flex items-center justify-center text-gray-500">
          <Illustrator src="./b6.svg" alt="signin illustration" width="60%" />
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex flex-col justify-center items-center p-4">
        <Form
          className="w-full max-w-sm p-4 rounded-sm"
          onSubmit={handleSubmit}
        >
          <fieldset className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign Up</h1>
            <p className="text-gray-500 text-sm">
              Fill in your details to create your account.
            </p>
          </fieldset>

          <InputField
            name="username"
            icon={<User />}
            placeholder="Username"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            error={getFieldError("username", Array.isArray(error) ? error : [])}
          />
          <InputField
            name="email"
            icon={<Mail />}
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            error={getFieldError("email", Array.isArray(error) ? error : [])}
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
            error={getFieldError("password", Array.isArray(error) ? error : [])}
          />
          <InputField
            name="confirmPassword"
            icon={<Key />}
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            error={getFieldError("confirm", Array.isArray(error) ? error : [])}
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-sm font-semibold hover:bg-blue-700 transition-all duration-200"
          >
            Create Account
          </button>

          <div className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="inline-block text-blue-600 font-medium hover:underline hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignupPage;
