import { useEffect } from "react";
import { getAllRecords } from "./utils/database";
import { Router } from "@reach/router";
import Kosten from "./components/Kosten";
import KostenDetail from "./components/KostenDetail";

function App() {
  useEffect(() => {
    getAllRecords();
  }, []);
  return (
    <Router>
      <Kosten path="/" />
      <KostenDetail path="/detail/:ref" />
    </Router>
  );
}

export default App;
