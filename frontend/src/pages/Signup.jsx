
import { useState } from "react"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";


const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isTermsChecked, setIsTermsChecked] = useState(false)
    const [isRememberChecked, setIsRememberChecked] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [error2, setError2] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const signup = async (data) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/user/signup`, options)
            if (response.ok) {
                const data = await response.json()
                dispatch(setUser(data));
                navigate('/')
            } else {
                setError2(true)
                setTimeout(() => {
                    setError2(false)
                }, 3000)
            }
        } catch (err) {
            setError2(true)
            setTimeout(() => {
                setError2(false)
            }, 3000)
            console.log(err)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name !== "" && password !== "" && email !== "") {
            signup({ name, email, password })
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 3000);
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
            <div className="container-fluid log mt-5 ">
                <h2 className="text-center  fs-2 fw-bolder mt-4 ">Sign Up</h2>

                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="name">User Name :</label>
                        <input type="text" name='name' id='name' placeholder='Enter User Name' value={name} autoComplete="off" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="email">Email ID :</label>
                        <input type="email" name='email' id='email' placeholder='Enter Email ID' value={email} autoComplete="off" onChange={(e) => setEmail(e.target.value)} required />
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
                    </div>

                    <div className="checkbox terms">
                        <input type="checkbox" id="terms" name="terms" checked={isTermsChecked} onChange={() => setIsTermsChecked(!isTermsChecked)} required />
                        <label htmlFor="terms">Agree to <Link href={"/"}>Terms & Conditions</Link></label>
                    </div>

                    <div>
                        <input type="submit" name="submit" id="submit" value={"Submit"} />
                        {success && <p className="text-success fw-lighter ">Registration Successful 😃</p>}
                        {error && <p className="error">please fill all the details😔</p>}
                        {error2 && <p className="error">Error Signing up</p>}
                    </div>

                </form>

                <div className="register">
                    <p>Already have an account?
                        <Link to={"/login"}>Sign in </Link>
                    </p>
                </div>

            </div>
        </>
    )
}

export default Signup;
