'use client'
import { useCart } from "@/context/Carrinho";
import BuyReview from "./BuyReview";
import PayForm from "./forms/PayForm";
import BuyForm from "./forms/BuyForm";


export default function Page() {
    const { carrinho, formattedTotalPrice } = useCart();
    return (
        <main className="flex flex-col items-center  w-full min-h-screen h-full">
            <h1 className="mt-16 text-xl">Finalizar compra</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-96  p-4 md:p-12">

                <div className="border shadow-md rounded-md max-h-96 h-96 relative overflow-y-scroll">
                <h1 className="bg-white p-4 sticky top-0 z-40"><strong>Total</strong> R$ {formattedTotalPrice()} </h1>
                    <BuyReview />
                </div>
                <div className="border shadow-md rounded-md p-8 max-h-96 h-96 overflow-y-scroll">
                    <BuyForm />
                </div>


            </div>




        </main>

    );
}
