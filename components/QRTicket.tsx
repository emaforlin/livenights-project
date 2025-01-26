import QRCode from "react-qr-code"

const QRTicket = ({uid}:{uid:string}) =>{
    const API_ENDPOINT = process.env.NEXT_PUBLIC_TICKETS_API_ENDPOINT;
    console.log("env", API_ENDPOINT, uid);
    return (
        <div className="flex justify-center w-1/3">
            <QRCode value={API_ENDPOINT+"/"+uid} size={200}></QRCode>
        </div>
    )
}

export default QRTicket;