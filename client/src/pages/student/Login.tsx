import { useState } from "react";
import { BookOpen } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { loginSucess } from "../../store/authSlice";
import { Link } from "react-router-dom";
import { useStudents } from "../../hooks/useStudent";
import { toast } from "react-toastify";

interface FormData {
  name?: string;
  email: string;
  password: string;
}
export default function StudentPortalLogin() {
  // const [name, setname] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isPasswordVisible, setPasswordVisible] = useState<Boolean>(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { useStudentLogin } = useStudents();
  const { mutate: studentLogin, isLoading } = useStudentLogin();

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validateForm = (): Boolean => {
    const newErrors: Partial<FormData> = {};
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Valid email is required.";
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    studentLogin(
      { email: formData.email, password: formData.password },
      {
        onSuccess: (data: any) => {
          console.log("Login success:", data);
          if (data[0]?.id) {
            console.log();
            dispatch(
              loginSucess({ username: data[0]?.name, email: data[0]?.email })
            );
            toast.success("Login success");
          } else {
            toast.error("invalid email or password");
          }
        },
        onError: (error) => {
          console.error("Login failed:", error);
          toast.error("Login failed");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <BookOpen className="mx-auto h-12 w-12 text-black" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Student Portal Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4 ">
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
                "Login in"
              )}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link
            to="/student/signup"
            className="font-medium text-black hover:text-gray-800 hover:border-b-2 hover:border-gray-700 transition duration-150 ease-in-out"
          >
            Don't have account ? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
