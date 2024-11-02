import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import jwt_decode from "jwt-decode";
import { useState } from "react";

export const Login = () => {
    const { register, handleSubmit, formState:{errors} } = useForm()
    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post('https://127.0.0.1:8000/login', { data })
        .then(function(res) {
            if (res.data === 2) {
                sessionStorage.setItem("connexion", "true")
                sessionStorage.setItem("admin", "true")
                navigate("/profil")
                window.location.reload();
            } else if(res.data === 1) {
                sessionStorage.setItem("connexion", "true")
                sessionStorage.setItem("admin", "false")
                navigate("/profil")
                window.location.reload();
            } else {
                sessionStorage.setItem("connexion", "false");
                sessionStorage.setItem("admin", "false")
                window.location.reload();
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    }

    const onReseau = (data) => {
        const formData = new FormData();

        formData.append('email', data.email)

        axios.post('https://127.0.0.1:8000/login/google', formData)
        .then(function(res) {
            if(res.data === 1) {
                sessionStorage.setItem("connexion", "true")
                sessionStorage.setItem("admin", "false")
                navigate("/profil")
                window.location.reload();
            } else {
                sessionStorage.setItem("connexion", "false");
                sessionStorage.setItem("admin", "false")
                window.location.reload();
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    }
    
    return(
        <div className="login">
            <h1>Se Connecter</h1><br/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" name="email" id="email" placeholder="Adresse mail" {...register("email", { required: true })}/>
                </div>
                {errors.email && <span>Veuillez entrer une adresse email</span>}
                <div>
                    <input type="password" name="pwd" id="pwd" placeholder="Mot de passe" {...register("pwd", { required: true })}/>
                </div>
                {errors.pwd && <span>Veuillez entrer un mot de passe</span>}
                <div>
                    <a href="/forgotpwd">Mot de passe oublié ?</a><br/><br/>
                </div>
                <div>
                    <input type="submit" value="Valider" />
                </div>
            </form>
            <div className="contain-register-google">
                <GoogleOAuthProvider clientId="870613116832-81vl4hjedj523v16o8rsp5rmo4csb0v7.apps.googleusercontent.com">
                    <GoogleLogin
                    onSuccess={credentialResponse => {
                        var decoded = jwt_decode(credentialResponse.credential);
                        onReseau(decoded);
                    }}
                    onError={() => {
                        console.log('Login Failed')
                    }}
                    />
                </GoogleOAuthProvider>
                <FacebookLogin
                    appId="620391593536663"
                    style={{
                        backgroundColor: '#4267b2',
                        color: '#fff',
                        fontSize: '16px',
                        marginTop: '5px',
                        padding: '1vh 5.6vh 1vh 5.7vh',
                        border: 'none',
                        borderRadius: '4px',
                      }}
                    onProfileSuccess={(response) => {
                        onReseau(response);
                    }}
                    onError={(err) => {
                        console.log('Login Failed')
                    }}
                />
            </div>
        </div>
    )
}