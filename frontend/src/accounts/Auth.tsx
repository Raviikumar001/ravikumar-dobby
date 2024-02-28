import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import LoadingComponent from "../components/LoadingComponent";
import MessageComponent from "../components/MessageComponent";
import { registerStart,registerSuccess, registerFailure,loginStart,loginSuccess,loginFailure 
,defaultState
} from "../store/slices/authSlice";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
type VARIENT = "LOGIN" | "REGISTER";

const Auth: React.FC = () => {
  const [Varient, setVarient] = useState<VARIENT>("LOGIN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); 
  const { error,loading } = useSelector((state: RootState) => state.auth);

  let navigate = useNavigate();
  const toggleVarient = useCallback(() => {
    if (Varient === "LOGIN") {
      setEmail("");
      setPassword("");
      setVarient("REGISTER");
      dispatch(defaultState())

    } else {
      setEmail("");
      setPassword("");
      setVarient("LOGIN");
      dispatch(defaultState())

    }
  }, [Varient]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const authApi = Varient === "LOGIN" ?"/v1/auth/login" : "/v1/auth/register"  ;
    const dispatchAction = Varient === "LOGIN" ? loginStart : registerStart;

    if((email || password) ==='')
    {
      dispatch(loginFailure("Fielda are empty !"));
      return;
    }else if(password.length<4)
    {
      dispatch(loginFailure("Password should be greater than 3 chars"));
      return;
    }

    try {
      dispatch(dispatchAction())




      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${authApi}`,{
        email,
        password
      })

      console.log(response);
      if(response)
      {   
         if (Varient === 'REGISTER'){
          const user = response.data?.user;
          const token = response.data?.token.replace(/"/g, '');
          dispatch(registerSuccess({user,token}));
          navigate('/app');
         }else if(Varient == 'LOGIN')
         {
            const user = response.data?.user;
          const token = response.data?.token.replace(/"/g, '');
      
          dispatch(loginSuccess({user,token}))
          navigate('/app');
         }

      }
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      console.log(error)
      if (err.response) { 
        if (Varient === 'REGISTER'){
          const message = err.response?.data?.message;
         dispatch(registerFailure(message))
        }else if(Varient == 'LOGIN')
        {
          const message = err.response?.data?.message;
         dispatch(loginFailure(message))
        }
    
      }
    }
  };



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
             px-10
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
          <form  onSubmit={(e) => handleSubmit(e)}>
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

        {loading&&    <LoadingComponent message={Varient == "LOGIN" ? "Authenticating" : "Creating User"} />}
            {error && <MessageComponent message={error} />}
            <button
            
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
              New to Platform?  { " "}<span className="text-[#6420AA] cursor-pointer">Sign up</span>
            </p>
          ) : (
            <p
              className="mt-4
             w-full
             text-center
             "
            >
              Already have an account? { " "}
              <span onClick={toggleVarient} className="text-[#6420AA] cursor-pointer">
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
