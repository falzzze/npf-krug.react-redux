import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import {
  addUser,
  fetchRandomUser,
  fetchUsersViaAPI,
} from "../../redux/slices/usersSlice";
import { setError } from "../../redux/slices/errorSlice";
import createSelectUser from "../../utils/createSelectUser";
import "./UserForm.css";

const url = "https://jsonplaceholder.typicode.com/users";

const UserForm = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username && name && email) {
      dispatch(addUser(createSelectUser({ username, name, email }, "manual")));
      setUsername("");
      setName("");
      setEmail("");
    } else {
      dispatch(setError("You need to fill in all the fields"));
    }
  };

  const handleAddRandomUser = () => {
    dispatch(fetchRandomUser(url));
  };

  const handleAddUsersViaAPI = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchUsersViaAPI(url));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-block user-form">
      <h2>Add a New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Add User</button>
        <button type="button" onClick={handleAddRandomUser}>
          Add Random User
        </button>
        <button
          type="button"
          onClick={handleAddUsersViaAPI}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span>Loading Users...</span> <FaSpinner className="spinner" />
            </>
          ) : (
            "Add Users Via API"
          )}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
