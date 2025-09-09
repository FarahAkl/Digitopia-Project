import { useEffect } from "react";
// import { getAllReports } from "./services/report/apiGetAllReport";
import { login } from "./services/Auth/apiLogin";
import { register } from "./services/Auth/apiRegister";

function App() {
  // 403 forbbiden
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await getAllReports();
  //       console.log("Reports response ✅:", res);
  //     } catch (err) {
  //       console.error("Reports error ❌:", err);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const testLogin = async () => {
      try {
        const data = await login({
          email: "farahheshamakl@gmail.com",
          password: "farah32l",
        });
        console.log("✅ Login success:", data);
      } catch (error) {
        console.error("❌ Login failed:", error);
      }
    };
    testLogin();
  }, []);

  useEffect(() => {
    const testRegister = async () => {
      try {
        const data = await register({
          name: "Farah Akl",
          email: "farah@example.com",
          password: "Abcd1234!",
          phoneNumber: "01012345678",
          profileImageUrl: "https://example.com/profile.jpg",
          location: "mansoura",
        });
        console.log("✅ Register success:", data);
      } catch (error) {
        console.error("❌ Register failed:", error);
      }
    };

    testRegister();
  }, []);

  return <>hello</>;
}

export default App;
