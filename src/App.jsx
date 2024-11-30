
import { Link, useLoaderData } from 'react-router-dom'
import './App.css'
import Swal from 'sweetalert2';
import { useState } from 'react';

function App() {

  const loader = useLoaderData();
  console.log(loader);

  const [coffees, setCoffees] = useState(loader);
  
  const handleDelete = _id => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('delete : ', _id);
          fetch(`http://localhost:5000/coffee/${_id}`, {
            method: 'DELETE',
          })
          .then(res => res.json())
          .then(data => {
            if(data.deletedCount > 0){
              console.log(data);
              const remaining = coffees.filter(coff => coff._id !== _id);
              setCoffees(remaining);
              Swal.fire({
                title: "Deleted!",
                text: "Coffee has been deleted.",
                icon: "success"
              });
            }
            
          })

          
        }
      });
  }

  return (
    <>

      <h1 className='font-bold text-3xl text-yellow-900'>Coffee Station</h1>
      <p>total coffee = {coffees.length}</p>

      <div className='grid md:grid-cols-2 gap-4 my-10'>
        {
          coffees.map(coffee => <div key={coffee._id} className='flex justify-between items-center bg-gray-300 p-3 rounded-lg'>
            <div>
              <img src={coffee.photo} className=''/>
            </div>

            <div>
              <p>Name: {coffee.name}</p>
              <p>{coffee.taste} </p>
              <p>{coffee.details}</p>
              <p>{coffee.quantity}</p>
            </div>

            <div>
              <div className="join join-vertical space-y-3">
                <button className="btn join-item">Add</button>
                <Link to={`/update/${coffee._id}`}><button className="btn join-item">Update</button></Link>
                <button onClick={() => handleDelete(coffee._id)} className="btn join-item">X</button>
              </div>
            </div>
          </div>)
        }
      </div>

      <Link to='/update'>Update</Link>
      <Link to='/add'>Add Coffee</Link>


    </>
  )
}

export default App
