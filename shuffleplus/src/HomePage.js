import React from "react";
import UserAuth from "./userAuth";


export default function HomePage({ code }){
    const accessToken = UserAuth(code)
    
    return(
        <div>
            {code}
        </div>
    )
}
