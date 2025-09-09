import { useEffect } from "react";
import { getAllReports } from "./services/report/apiGetAllReport";
import { login } from "./services/Auth/apiLogin";

function App() {
  // 403 forbbiden
  useEffect(() => {
    (async () => {
      try {
        const res = await getAllReports();
        console.log("Reports response ✅:", res);
      } catch (err) {
        console.error("Reports error ❌:", err);
      }
    })();
  }, []);

  useEffect(() => {
    const testLogin = async () => {
      try {
        const data = await login(
          "farahheshamakl@gmail.com",
          "farah32l",
        );
        console.log("✅ Login success:", data);
      } catch (error) {
        console.error("❌ Login failed:", error);
      }
    };
    testLogin();
  }, []);
  return <>hello</>;
}

export default App;
