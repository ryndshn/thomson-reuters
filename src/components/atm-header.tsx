import Image from "next/image";

export default function ATMHeader() {
  return (
    <div className="relative">
      <Image
        src="/atm_sign.png"
        alt="ATM Sign"
        width={600}
        height={80}
        className="rounded-lg"
      />
      <Image
        src="/graffiti.png"
        alt="Graffiti"
        width={300}
        height={38}
        className="absolute top-10 right-5"
      />
    </div>
  );
}