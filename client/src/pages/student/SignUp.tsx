import { useState } from "react";
import { BookOpen } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useStudents } from "../../hooks/useStudent";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function StudentPortalSignUp() {
  // const [name, setname] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isPasswordVisible, setPasswordVisible] = useState<Boolean>(false);
  const navigate = useNavigate();
  const { addStudentMutation } = useStudents();
  const { isLoading, data } = addStudentMutation;
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = (): Boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) {
      newErrors.name = "name is required.";
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (
      !formData.confirmPassword.trim() ||
      formData.confirmPassword.length < 6
    ) {
      newErrors.confirmPassword = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((formData.email = "admin@gmail.com")) {
      toast.error("Sorry, Try using another email");
      return;
    }

    if (validateForm()) {
      try {
        await addStudentMutation.mutateAsync({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });
        toast.success("Sign up successful!");
        navigate("/student");
      } catch (error: any) {
        const errorMessage = error.response?.data || error.message;
        if (errorMessage?.startsWith("duplicate"))
          toast.error("Email already exists");
        else toast.error(errorMessage);
        console.log(errorMessage);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-black" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Student Portal SignUp
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="text" className="sr-only">
                User Name
              </label>
              <input
                id="text"
                name="name"
                type="text"
                autoComplete="text"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="User Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className=" relative">
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                  className="absolute right-2 top-3"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <div className=" relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isPasswordVisible ? "text" : "password"}
                  autoComplete="confirmPassword"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <FontAwesomeIcon
                  icon={isPasswordVisible ? faEyeSlash : faEye}
                  className="absolute right-2 top-3"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {errors.confirmPassword && (
                <p style={{ color: "red" }}>{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </span>
              ) : (
                "Sign Up"
              )}
            </button>
            {data && <p style={{ color: "green" }}>Sign up successful!</p>}
          </div>
        </form>
        <div className="text-center">
          <Link
            to="/student"
            className="font-medium text-black hover:text-gray-800 transition duration-150 ease-in-out"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
