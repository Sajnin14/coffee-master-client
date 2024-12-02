import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";


const Signin = () => {

    const {signInUser} = useContext(AuthContext);

    const handleSignIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        console.log(email, password);

        signInUser(email, password)
        .then(result => {
            console.log(result.user);
            const lastSignInTime = result.user?.metadata?.lastSignInTime;
            
            const signInUserInfo= {email, lastSignInTime}

            console.log(signInUserInfo);
            fetch('http://localhost:5000/users', {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(signInUserInfo)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        })
        .catch(err => console.log(err.code))


    }
    return (
        <div>
            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl mx-auto">
                <h3 className="font-semibold text-lg my-3">Please Sign In</h3>
                <form onSubmit={handleSignIn} className="card-body">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Sign In</button>
                    </div>
                </form>
                <p>new to coffee master? go <Link to='/auth/signup' className="text-blue-700 underline">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Signin;