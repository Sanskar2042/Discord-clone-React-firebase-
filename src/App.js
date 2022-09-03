import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useGlobalContext } from "./context/user_context";
import Login from "./components/Login";

function App() {
  const { user } = useGlobalContext();

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setUser(authUser);
  //     } else {
  //       signOut(auth,provider);
  //     }
  //   });
  // }, []);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
