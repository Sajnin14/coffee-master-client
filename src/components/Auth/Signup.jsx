import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const Signup = () => {
    
    const {createUser} = useContext(AuthContext);

    const handleCreateUser = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        
        console.log(email, password);

        createUser(email, password)
        .then(res => {
            console.log(res.user);
            const createdAt = res.user?.metadata?.creationTime;
            const newUser = {name, email, createdAt}
            fetch('http://localhost:5000/users', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
        })
        .catch(err => {
            console.log(err.code);
        })
    }

    return (
        <div>
            <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl mx-auto">
                <h3 className="font-semibold text-lg my-3">Please Sign Up</h3>
                <form onSubmit={handleCreateUser} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                    </div>
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

                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;