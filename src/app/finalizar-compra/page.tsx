'use client'
import { useCart } from "@/context/Carrinho";
import { PersonalForm } from "./forms/PersonalForm";
import BuyReview from "./BuyReview";
import PayForm from "./forms/PayForm";


export default function Page() {
    const { carrinho } = useCart();
    return (
        <main className="flex flex-col items-center  w-full min-h-screen h-full">
            <h1 className="mt-16 text-xl">Finalizar compra</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full h-96  p-4 md:p-12">

                <div className="border shadow-md rounded-md p-4 md:p-8">
                    <BuyReview />
                </div>
                <div className="border shadow-md rounded-md p-8">
                    {/* <PersonalForm /> */}
                    <PayForm />
                </div>


            </div>




        </main>

    );
}
