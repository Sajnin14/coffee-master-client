import Swal from 'sweetalert2'

const Add = () => {

    const handleAddCoffee = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supply = form.supply.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const newForm = {name, quantity, supply, taste, category, details, photo}
        console.log(newForm);

        fetch('http://localhost:5000/coffee', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newForm)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedCount > 0){
                console.log(data);
                Swal.fire({
                    title: 'Success!',
                    text: 'coffee added successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool',
            
                  })
            }
            
        })
    }
    return (
        <div className="bg-[#F4F3F0] py-16 px-40 rounded-xl">
            <h3 className="font-bold italic text-2xl my-5">Add New Coffee</h3>

            <form onSubmit={handleAddCoffee}>

                {/* first coumn */}
                <div className="md: flex gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Coffee Name</span>
                        </label>
                        <input type="text" name='name' placeholder="enter coffee name" className="input input-bordered" required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Quantity</span>
                        </label>
                        <input type="text" name='quantity' placeholder="enter coffee quantity" className="input input-bordered" required />
                    </div>
                </div>

                {/* second row */}
                <div className="md: flex gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Supplier</span>
                        </label>
                        <input type="text" name='supply' placeholder="enter supplier name" className="input input-bordered" required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Taste</span>
                        </label>
                        <input type="text" name='taste' placeholder="enter coffee taste" className="input input-bordered" required />
                    </div>
                </div>

                {/* third row */}

                <div className="md: flex gap-3">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <input type="text" name='category' placeholder="enter coffee category" className="input input-bordered" required />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <input type="text" name='details' placeholder="enter coffee details" className="input input-bordered" required />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">photo</span>
                    </label>
                    <input type="text" name='photo' placeholder="enter coffee photo" className="input input-bordered" required />
                </div>

                <div className="form-control">
                    <input type="submit" value="Add Coffee" className="input input-bordered my-7 text-[#331A15] bg-[#D2B48C] border border-[#331A15]" />
                </div>
            </form>
        </div>
    );
};

export default Add;