import { useState } from "react"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isRememberChecked, setIsRememberChecked] = useState(false)
    const [error, setError] = useState(false)
    const [error2, setError2] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async (data) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/user/login`, options)
            if (response.ok) {
                const data = await response.json()
                dispatch(setUser(data));
                navigate('/')
            } else {
                const data = await response.json()
                if (data.message === "User doesn't exist") {
                    setError2(data.message)
                    setTimeout(() => navigate('/signup'), 1000)
                }
                else {
                    setError2(data.message)
                    setTimeout(() => {
                        setError2(false)
                    }, 3000)
                }
            }
        } catch (err) {
            setError2("Error Log In")
            setTimeout(() => {
                setError2(false)
            }, 3000)
            console.log(err)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
            login({ email, password })
        }
        else {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }

    return (
        <>
            <div className="container-fluid log mt-5">
                <h2 className="text-center  fs-2 fw-bolder mt-4 ">Log In</h2>

                <form action="/">
                    <div className="formGroup">
                        <label htmlFor="email"> Email Id :</label>
                        <input type="text" name='email' id='email' placeholder='Enter Email ID' value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="password">Password :</label>
                        <input type={showPassword ? "text" : "password"} name='password' id='password' value={password} placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} required />
                        <span className="icon" onClick={() => setShowPassword(!showPassword)} >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </span>
                    </div>

                    <div className="checkbox remember">
                        <input type="checkbox" id="remember" checked={isRememberChecked} onChange={() => setIsRememberChecked(!isRememberChecked)} />
                        <label htmlFor="remember">Remember me</label>
                        <Link to={"/"}>Change Password</Link>
                    </div>

                    <div>
                        <input type="submit" name="submit" id="submit" value={"Submit"} onClick={handleSubmit} />
                        {error && <p className="error">please fill all the details😔</p>}
                        {error2 && <p className="error">{error2}</p>}
                    </div>

                </form>

                <div className="register">
                    <p>Don't have an account?
                        <Link to={"/signup"}> Register Here </Link>
                    </p>
                </div>

            </div>
        </>
    )
}

export default Login;
