import { Link } from "react-router-dom"
export const ErrorPage= () =>{
return  (<div>
<div id="centre-div">
        <img id="errorImage" src="https://miro.medium.com/v2/resize:fit:800/1*hFwwQAW45673VGKrMPE2qQ.png"/>
        </div>
        <h1>The link you have typed in is not a valid URL</h1>

                <p className="align-text">Please click the button below to be redirected to the home page.</p>
                <div id="centre-div">
                <Link to="/home"><button className="button">Click Here!</button></Link>
                </div>
    </div>
    )
}