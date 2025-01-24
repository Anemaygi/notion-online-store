import { useCart } from "@/context/Carrinho";
import PayForm from "./components/PayForm";
import PersonalForm from "./components/PersonalForm";
import { useState } from "react";
import FinalizeComponent from "./components/FinalizeComponent";


export interface DadosCompra {
    name: string;
    mail: string;
    phone: string;
    comprovante: File | null;
}

const initial = {
    name: "",
    mail: "",
    phone: "",
    comprovante: null
}

export default function BuyForm() {
   
    const [step, setStep] = useState(0)
    const [finalData, setFinalData] = useState<DadosCompra>(initial)
    const finalize = () => console.log(finalData)

    return (

        <main className="h-full">
            {step == 0 ? (
                <PersonalForm setStep={setStep} finalData={finalData} setFinalData={setFinalData} />
            ) : step == 1 ? (
                <PayForm setStep={setStep} setFinalData={setFinalData} finalize={finalize} />
            ) : (
                <FinalizeComponent />
            )
            }
        </main>


    );
}
