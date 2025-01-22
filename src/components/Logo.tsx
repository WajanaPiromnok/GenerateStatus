import Image from "next/image";

export default function Logo(){
    return (
        <div className="relative w-32 h-9">
            <Image src="/images/logo/logo.png" alt="logo" fill />
        </div>
    )
} 