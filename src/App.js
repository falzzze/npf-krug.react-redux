import "./App.css";
import UserForm from "./components/UserForm/UserForm";
import UserList from "./components/UserList/UserList";
import Error from "./components/Error/Error";
import Filter from "./components/Filter/Filter";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Users</h1>
      </header>
      <main className="app-main">
        <div className="app-left-column">
          <UserForm />
        </div>
        <div className="app-right-column">
          <Filter />
          <UserList />
        </div>
      </main>
      <Error />
    </div>
  );
}

export default App;
