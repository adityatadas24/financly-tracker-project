import React, { useState } from "react";
import "./style.css";
import Input from "../inputs/Input";
import Buttons from "../buttons/Buttons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db,provider} from "../../Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Indexs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasssword, setConfirmPassword] = useState("");
  const [loginForm, setLogninForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function signupEmailPassword(e) {
    e.preventDefault();
    setLoading(true);
    console.log("name", name);
    console.log(email);
    console.log(password);
    console.log(confirmPasssword);

    if (name != "" && email != "" && password != "" && confirmPasssword != "") {
      if (password === confirmPasssword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            toast.success("User Created Successfully!");
            setName("");
            setEmail("");
            setConfirmPassword("");
            setPassword("");
            navigate("/dashboard");
            setLoading(false);
            creteDoc(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("password and confirm password do not match");
        setLoading(false);
      }
    } else {
      toast.error("All Fields are Mandatory");
      setLoading(false);
    }
  }

  function loginEmailPassword(e) {
    e.preventDefault();
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("Login Successfully!");
          setEmail("");
          setPassword("");
          navigate("/dashboard");
          setLoading(false);
          creteDoc(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All Fields are Mandatory");
      setLoading(false);
    }
  }

  async function creteDoc(user) {
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email:user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        setLoading(false);
        toast.success("Doc created!");
        
      } catch (e) {
        toast.error(e.massage);
        setLoading(false);
      }
    } else {
    
      setLoading(false);
    }

  }
  
  function SignupGoogles(e) {
    e.preventDefault();
    setLoading(true)
    try{
      signInWithPopup(auth, provider)
      .then((result) => {
       
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
       
        const user = result.user;
       
       
        navigate("/dashboard");
        toast.success("User Authenticated!");
        creteDoc(user);
        setLoading(false)
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
       
       
        toast.error(errorMessage)
        setLoading(false)
        // ...
      });
    }catch(e){
      toast.error(e.massage)
      setLoading(false)
    }
   
      
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <p className="p-name">
            Login On
            <span className="financely"> Financely.</span>
          </p>
          <form>
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
              type={"email"}
            />

            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"password"}
              type={"password"}
            />

            <Buttons
              disabled={loading}
              text={loading ? "Loading..." : "login with Email and password"}
              onClick={loginEmailPassword}
            />
            <p>Or</p>

            <Buttons
              disabled={loading}
              text={loading ? "Loading..." : "Login with Google"}
              onClick={SignupGoogles}
              blue={true}
            />

            <p>
              Or Don't Have an Account ?{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setLogninForm(!loginForm)}
                className="click-me"
              >
                Click here.
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <p className="p-name">
            Sign Up On
            <span className="financely" > Financely.</span>
          </p>
          <form>
            <Input
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"John Doe"}
              type={"text"}
            />
            <Input
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@gmail.com"}
              type={"email"}
            />
            <Input
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"password"}
              type={"password"}
            />
            <Input
              label={"Confirm Password"}
              state={confirmPasssword}
              setState={setConfirmPassword}
              placeholder={"confirm password"}
              type={"password"}
            />
            <Buttons
              disabled={loading}
              text={loading ? "Loading..." : "Signup Email and password"}
              onClick={signupEmailPassword}
            />
            <p style={{margin:'0'}}>Or</p>
            <Buttons
              disabled={loading}
              text={loading ? "Loading..." : "Signup with Google"}
              onClick={SignupGoogles}
              blue={true}
            />
            <p className="click"> 
              Or Have an Account Already ?{" "}
              <span
                style={{ cursor: "pointer"}}
                className="click-me"
                onClick={() => setLogninForm(!loginForm)}
              >
                Click here.
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Indexs;
