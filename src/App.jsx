import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ClickSpark from "./components/ClickSpark";

function App() {
  return (
    <ClickSpark>
      <Router>
        <AppRoutes />
      </Router>
    </ClickSpark>
  );
}

export default App;
