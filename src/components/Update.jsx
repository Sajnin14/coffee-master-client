import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const Update = () => {
    const loader = useLoaderData();

    const handleUpdateCoffee = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supply = form.supply.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const newForm = { name, quantity, supply, taste, category, details, photo }
        console.log(newForm);
        Swal.fire({
            title: "Are you sure?",
            text: "Your Coffee Data will be Updated!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/coffee/${loader._id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type' : 'application/json'
                    },
                    body: JSON.stringify(newForm)
                })
                .then(res => res.json())
                .then(data => {
                    if(data.modifiedCount > 0){
                        // console.log(data);
                        Swal.fire({
                            title: "Updated!",
                            text: "Your Coffee has been Updated.",
                            icon: "success"
                        });
                    }
                    
                })
                
            }
        });



    }

    return (
        <div className="bg-[#F4F3F0] py-16 px-40 rounded-xl">
            <h3 className="font-bold italic text-2xl my-5">Update Existing Coffee</h3>
            <p>update info of : {loader.name}</p>

            <form onSubmit={handleUpdateCoffee}>

                {/* first coumn */}
                <div className="md: flex gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Coffee Name</span>
                        </label>
                        <input type="text" name='name' defaultValue={loader.name} className="input input-bordered" required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Quantity</span>
                        </label>
                        <input type="text" name='quantity' defaultValue={loader.quantity} className="input input-bordered" required />
                    </div>
                </div>

                {/* second row */}
                <div className="md: flex gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Supplier</span>
                        </label>
                        <input type="text" name='supply' defaultValue={loader.supply} className="input input-bordered" required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Taste</span>
                        </label>
                        <input type="text" name='taste' defaultValue={loader.taste} className="input input-bordered" required />
                    </div>
                </div>

                {/* third row */}

                <div className="md: flex gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <input type="text" name='category' defaultValue={loader.category} className="input input-bordered" required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <input type="text" name='details' defaultValue={loader.details} className="input input-bordered" required />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">photo</span>
                    </label>
                    <input type="text" name='photo' defaultValue={loader.photo} className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <input type="submit" value="Update Coffee" className="input input-bordered my-7 text-[#331A15] bg-[#D2B48C] border border-[#331A15]" />
                </div>
            </form>
        </div>
    );
};

export default Update;