import { Login } from "./login"
import { Register } from "./register"

export const Account = () => {
    return(
        <div className="account">
            <Register />
            <Login />
        </div>
    )
}