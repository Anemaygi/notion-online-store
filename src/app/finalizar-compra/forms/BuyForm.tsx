import { useCart } from "@/context/Carrinho";
import PayForm from "./PayForm";
import PersonalForm from "./PersonalForm";
import { useState } from "react";


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
    const { formattedTotalPrice } = useCart();
    const [step, setStep] = useState(0)
    const [finalData, setFinalData] = useState<DadosCompra>(initial)
    const chavePix = "algumachaveaquiadd"
    const finalize = () => console.log(finalData)

    return (

        <main className="h-full">
            {step == 0 ? (
                <PersonalForm setStep={setStep} finalData={finalData} setFinalData={setFinalData} />
            ) : step == 1 ? (
                <div className="flex flex-col text-center items-center justify-center w-full h-full">
                    <div className="flex flex-col flex-grow w-full h-full">
                        <div>
                            Envie o valor de<br />
                            <strong className="mb-4 text-xl">R$ {formattedTotalPrice()}</strong><br />
                        </div>
                        <div>
                            para a seguinte chave pix:<br />
                            <strong className="text-xl">{chavePix}</strong>
                        </div>
                    </div>
                    <PayForm setStep={setStep} setFinalData={setFinalData} finalize={finalize} />
                </div>
            ) : (
                <div> Obrigada! </div>
            )
            }
        </main>


    );
}
