'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"

export default function AddProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleOpen(e: SyntheticEvent) {
    e.preventDefault();
    setModal(!modal);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      setIsMutating(true);
      await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          price: price
        })
      });
      setIsMutating(false);
      setTitle('');
      setPrice('');
      router.refresh();
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button className="btn" onClick={handleOpen}>Add New</button>
      <input type="checkbox" checked={modal} onChange={handleOpen} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="title" className="label font-bold">Title</label>
              <input type="text" className="w-full input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
            </div>
            <div className="form-control">
              <label htmlFor="price" className="label font-bold">Price</label>
              <input type="number" className="w-full input input-bordered" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter price" />
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" disabled={isMutating} type="submit">{!isMutating ? 'Submit' : 'Loading...'}</button>
              <button className="btn" onClick={handleOpen}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
