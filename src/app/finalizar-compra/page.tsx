'use client'
import { useCart } from "@/context/Carrinho";
import BuyReview from "./BuyReview";
import BuyForm from "./BuyForm";


export default function Page() {
    const { carrinho, formattedTotalPrice } = useCart();
    return (
        <main className="flex flex-col items-center  w-full min-h-screen h-full">
            <h1 className="h-24 items-center justify-center text-white  flex text-xl bg-black w-full text-center">Finalizar compra</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full lg:h-[80vh] p-4 md:p-12">

                <div className="border shadow-md rounded-md h-96 lg:h-full relative overflow-y-scroll">
                <h1 className="bg-white p-4 sticky top-0 z-10"><strong>Total</strong> R$ {formattedTotalPrice()} </h1>
                    <div className="-z-20"><BuyReview /></div>
                </div>
                <div className="border shadow-md rounded-md p-8 h-96 lg:h-full overflow-y-scroll">
                    <BuyForm />
                </div>


            </div>




        </main>

    );
}
