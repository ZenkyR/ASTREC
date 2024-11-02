import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import MicrosoftLogin from "react-microsoft-login";
import jwt_decode from "jwt-decode";

export const Register = () => {
    const { register, handleSubmit, formState:{errors} } = useForm()
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        axios.post('https://127.0.0.1:8000/register', { data, "value": null })
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
                sessionStorage.setItem("connexion", "false")
                sessionStorage.setItem("admin", "false")
                window.location.reload();
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    }
    
    const subReseau = (data) => {
        const formData = new FormData();

        formData.append('email', data.email)
        formData.append('name', data.name)
        axios.post('https://127.0.0.1:8000/regist/google', formData )
        .then(((res) => {
            if(res.data === 1) {
                sessionStorage.setItem("connexion", "true")
                sessionStorage.setItem("admin", "false")
                navigate("/profil")
                window.location.reload();
            } else {
                sessionStorage.setItem("connexion", "false")
                sessionStorage.setItem("admin", "false")
                window.location.reload();
            }
            
        }))
        .catch(((err) => console.log(err)))
    }

        const authHandler = (err, data) => {
          console.log(err, data); 
        }

    return(
        <div className="register">
            <h1>S'inscrire</h1><br/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="text" name="fname" id="fname" placeholder="Prénom" {...register("fname", { required: true })}/>
                </div>
                {errors.fname && <span>Veuillez entrer un prénom</span>}
                <div>
                    <input type="text" name="lname" id="lname" placeholder="Nom" {...register("lname", { required: true })}/>
                </div>
                {errors.lname && <span>Veuillez entrer un nom</span>}
                <div>
                    <input type="text" name="email" id="email" placeholder="Adresse mail" {...register("email", { required: true })}/>
                </div>
                {errors.email && <span>Veuillez entrer une adresse email</span>}
                <div>
                    <input type="password" name="pwd" id="pwd" placeholder="Mot de passe" {...register("pwd", { required: true })}/>
                </div>
                {errors.pwd && <span>Veuillez entrer un mot de passe</span>}
                <div>
                    <input type="password" name="pwdconf" id="pwdconf" placeholder="Confirmer votre mot de passe" {...register("pwdconf", { required: true })}/>
                </div>
                {errors.pwdconf && <span>Veuillez entrer la confirmation du mot de passe</span>}
                <div>
                    <input type="submit" value="Valider" className="submit" />
                </div>
            </form>
            <div className="contain-register-google">
                <GoogleOAuthProvider clientId="870613116832-81vl4hjedj523v16o8rsp5rmo4csb0v7.apps.googleusercontent.com">
                    <GoogleLogin
                    onSuccess={credentialResponse => {
                        var decoded = jwt_decode(credentialResponse.credential);
                        subReseau(decoded);
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
                        subReseau(response)
                    }}
                    onError={(err) => {
                        console.log('Login Failed')
                    }}
                />
                <MicrosoftLogin 
                    clientId={'7e3dfa99-730b-4931-bfa9-f3baa855d50d'} 
                    authCallback={authHandler} 
                    className="microsoft"
                />
            </div>
        </div>
    )
}

