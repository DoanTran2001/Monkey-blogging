import { auth } from "firebase-app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext, createContext  } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfor] = useState({});
  const values = { userInfo, setUserInfor };
  useEffect(() => {
    // Lấy user hiện tại từ firebase
    onAuthStateChanged(auth, (user) => {
      // console.log(user);
      setUserInfor(user);
    })
  }, [])
  return (
    <AuthContext.Provider {...props} value={values}>

    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  if(typeof context === "undefined") {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
export {AuthProvider, useAuth};