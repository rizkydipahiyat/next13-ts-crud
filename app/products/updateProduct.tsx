'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function UpdateProduct(product: Product) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleOpen(e: SyntheticEvent) {
    e.preventDefault();
    setModal(!modal);
  }

  async function handleUpdate(e: SyntheticEvent) {
    try {
      setIsMutating(true);
      await fetch(`http://localhost:5000/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          price: price
        })
      });
      setIsMutating(false);
      router.refresh();
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button className="btn btn-warning btn-sm text-slate-100" onClick={handleOpen}>Edit</button>
      <input type="checkbox" checked={modal} onChange={handleOpen} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label htmlFor="title" className="label font-bold">Title</label>
              <input type="text" className="w-full input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
            </div>
            <div className="form-control">
              <label htmlFor="price" className="label font-bold">Price</label>
              <input type="number" className="w-full input input-bordered" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Enter price" />
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" disabled={isMutating} type="submit">{!isMutating ? 'Update' : 'Updating...'}</button>
              <button className="btn" onClick={handleOpen}>Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
