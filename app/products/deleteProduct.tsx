'use client'

import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react"

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function DeleteProduct(product: Product) {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  function handleOpen(e: SyntheticEvent) {
    e.preventDefault();
    setModal(!modal);
  }

  async function handleDelete(productId: number) {
    setIsMutating(true);
    await fetch(`http://localhost:5000/products/${productId}`, {
      method: 'DELETE',
    });
    setIsMutating(false);
    router.refresh();
    setModal(false);
  }
  return (
    <div>
      <button className="btn btn-error text-slate-100 btn-sm" onClick={handleOpen}>Delete</button>
      <input type="checkbox" checked={modal} onChange={handleOpen} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure delete {product.title}?</h3>
          <div className="modal-action">
            <button className="btn btn-primary" disabled={isMutating} onClick={() => handleDelete(product.id)} type="button">{!isMutating ? 'Delete' : 'Deleting...'}</button>
            <button className="btn" onClick={handleOpen}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}
