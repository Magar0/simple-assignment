import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const [message, setMessage] = useState("")
    const [popup, setPopup] = useState(false)
    const user = useSelector(state => state.user)

    const decrypt = async () => {
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.token}`,
            },
        };
        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/decrypt`, options);
            const data = await res.json()
            setMessage(data.message)
        } catch (err) {
            console.log(err);
        }


    }

    useEffect(() => {
        if (user) {
            console.log("run");
            setPopup(true)
            setTimeout(() => {
                setPopup(false)
            }, 3000);
            // return clearTimeout(popupTimer);
        }
    }, [])

    return (
        <div className='container-fluid'>
            {
                popup &&
                <div className="popup popup_animated">
                    <p>Welcome {user.name}</p>
                </div>
            }
            {
                user &&
                <>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis nisi, nesciunt cumque vero dolore provident non. Laudantium nulla atque nostrum error tempora! Perspiciatis, adipisci sed tenetur incidunt dicta eveniet magnam error, ad deserunt iusto asperiores optio! Omnis aspernatur sunt deleniti, fugit quaerat ipsum animi doloribus culpa dolorum. Animi, quas vero!</p>
                    <button className='btn btn-primary' onClick={decrypt}>Decrypt</button>
                    {
                        message && <h3>{message}</h3>
                    }

                </>
            }
            {
                !user && <p>User Not Signed In</p>
            }
        </div>
    )
}

export default Home