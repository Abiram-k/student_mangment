import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: { name: string; email: string; password: string }) => void;
}
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<Partial<FormData>>({});
  const [isPasswordVisible, setPasswordVisible] = useState<Boolean>(false);

  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError({});
    if (name && email && password) {
      onAddUser({ name, email, password });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      onClose();
    }
  };
  const validateForm = (): Boolean => {
    const newErrors: Partial<FormData> = {};
    if (!name.trim()) {
      newErrors.name = "name is required.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!password.trim() || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!confirmPassword.trim() || confirmPassword.length < 6) {
      newErrors.confirmPassword = "Password must be at least 6 characters.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-black-500">
              Add New User
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 "
                  placeholder="Enter your name"
                />
                {error.name && <p style={{ color: "red" }}>{error.name}</p>}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 "
                  placeholder="Enter your email"
                />
                {error.email && <p style={{ color: "red" }}>{error.email}</p>}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 "
                    placeholder="Enter your password"
                  />
                  <FontAwesomeIcon
                    icon={isPasswordVisible ? faEyeSlash : faEye}
                    className="absolute right-2 top-3"
                    onClick={togglePasswordVisibility}
                  />
                </div>
                {error.password && (
                  <p style={{ color: "red" }}>{error.password}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 "
                  placeholder="Confirm your password"
                />
                {error.confirmPassword && (
                  <p style={{ color: "red" }}>{error.confirmPassword}</p>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300"
              >
                Add User
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddUserModal;
