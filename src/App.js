import "./App.css";
import Main from "./components/main";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <ReactNotifications />
                <Main />
            </div>
        </Provider>
    );
}

export default App;
