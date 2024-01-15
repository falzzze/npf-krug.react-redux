import { useDispatch, useSelector } from "react-redux";
import { BsBookmarkStarFill, BsBookmarkStar } from "react-icons/bs";
import {
  deleteUser,
  selectUsers,
  toggleSelected,
} from "../../redux/slices/usersSlice";
import {
  selectUsernameFilter,
  selectNameFilter,
  selectEmailFilter,
  selectOnlySelectedFilter,
} from "../../redux/slices/filterSlice";
import "./UserList.css";

const UserList = () => {
  const users = useSelector(selectUsers);
  const usernameFilter = useSelector(selectUsernameFilter);
  const nameFilter = useSelector(selectNameFilter);
  const emailFilter = useSelector(selectEmailFilter);
  const onlySelectedFilter = useSelector(selectOnlySelectedFilter);
  const dispatch = useDispatch();

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleToggleSelected = (id) => {
    dispatch(toggleSelected(id));
  };

  const filteredUsers = users.filter((user) => {
    const matchesUsername = user.username
      .toLowerCase()
      .includes(usernameFilter.toLowerCase());
    const matchesName = user.name
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
    const matchesEmail = user.email
      .toLowerCase()
      .includes(emailFilter.toLowerCase());
    const matchesSelected = onlySelectedFilter ? user.isSelected : true;
    return matchesUsername && matchesName && matchesEmail && matchesSelected;
  });

  const highlightMatch = (text, filter) => {
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, "gi");

    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };

  return (
    <div className="app-block user-list">
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users available</p>
      ) : (
        <ul>
          {filteredUsers.map((user, i) => (
            <li key={i}>
              <div className="user-info">
                {++i}. User:{" "}
                <strong>{highlightMatch(user.username, usernameFilter)}</strong>{" "}
                Name: <strong>{highlightMatch(user.name, nameFilter)}</strong>{" "}
                Email:{" "}
                <strong>{highlightMatch(user.email, emailFilter)}</strong> (
                {user.source})
              </div>
              <div className="user-actions">
                <span onClick={() => handleToggleSelected(user.id)}>
                  {user.isSelected ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
