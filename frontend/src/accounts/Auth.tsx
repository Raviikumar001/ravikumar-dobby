import React, { useState, useCallback } from "react";
import LoadingComponent from "../components/LoadingComponent";
import { Link } from "react-router-dom";
type VARIENT = "LOGIN" | "REGISTER";

const Auth: React.FC = () => {
  const [Varient, setVarient] = useState<VARIENT>("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleVarient = useCallback(() => {
    if (Varient === "LOGIN") {
      setEmail("");
      setPassword("");
      setVarient("REGISTER");
    } else {
      setEmail("");
      setPassword("");
      setVarient("LOGIN");
    }
  }, [Varient]);

  console.log(Varient);
  return (
    <div
      className="h-screen
     
     grid justify-center
     items-center
     content-center
     "
    >
      <div
        className="
        
        "
      >
        <div
          className="
             bg-white
             px-4
             py-8
             border
             rounded-lg
             shadow

             sm:px-10

            "
        >
          <h2 className="text-center font-bold text-lg">
            <Link to="/">PhotoUp</Link>
          </h2>

          <h2 className="text-2xl">{Varient == "LOGIN" ? "Sign in" : "Sign up"}</h2>
          <form>
            <h2 className="text-sm font-semibold pt-3 text-gray-500">Email</h2>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="p-2 mt-2 border border-gray-500 rounded-md" />
            <h2 className="text-sm font-semibold pt-3 text-gray-500">Password</h2>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="input-pass
                     mt-2
                     p-2 border border-gray-500 rounded-md"
            />

            <LoadingComponent message={Varient == "LOGIN" ? "Authenticating" : "Creating User"} />
            <button
              disabled
              className="block 
                  text-white
                  rounded-full
                  mt-5
                  p-2
                  bg-[#6420AA]
                  w-full
                disabled:bg-gray-400
                
                  "
            >
              {Varient == "LOGIN" ? "Sign in" : "Continue"}
            </button>
          </form>
          {Varient == "LOGIN" ? (
            <p
              className="mt-4
                w-full
                text-center
                "
              onClick={toggleVarient}
            >
              New to Platform? <span className="text-[#6420AA]">Sign up</span>
            </p>
          ) : (
            <p
              className="mt-4
             w-full
             text-center
             "
            >
              Already have an account?
              <span onClick={toggleVarient} className="text-[#6420AA]">
                Sign in
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
