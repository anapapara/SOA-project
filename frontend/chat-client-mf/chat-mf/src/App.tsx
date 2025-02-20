import ReactDOM from "react-dom/client";
import LoggedUserLabel from './components/LoggedUserLabel';

import "./index.css";

const App = () => ( 
  <LoggedUserLabel/>
  
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);