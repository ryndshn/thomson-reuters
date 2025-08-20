/* eslint-disable @next/next/no-img-element */
// Not getting many of the benefits of next/image since we're client side rendering.
// Using standard img tag for simpler styling.

export default function ATMHeader() {
  return (
    <div className="relative">
      <img
        src="/atm_sign.png"
        alt="ATM Sign"
        className="rounded-lg w-[600px] h-[246px]"
      />
      <img
        src="/graffiti.png"
        alt="Graffiti"
        className="absolute top-10 right-5 w-[300px] h-[100px]"
      />
    </div>
  );
}