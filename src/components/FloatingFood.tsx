import sushiImg from "@/assets/sushi.png";
import makiImg from "@/assets/maki.png";
import prawnsImg from "@/assets/prawns.png";

const FloatingFood = () => {
  return (
    <>
      <img
        src={sushiImg}
        alt="Sushi"
        width={120}
        height={120}
        className="fixed top-[10%] left-[5%] w-20 md:w-28 float-animation-1 opacity-80 pointer-events-none z-0"
      />
      <img
        src={makiImg}
        alt="Maki"
        width={120}
        height={120}
        className="fixed top-[15%] right-[5%] w-20 md:w-28 float-animation-2 opacity-80 pointer-events-none z-0"
      />
      <img
        src={prawnsImg}
        alt="Prawns"
        width={100}
        height={100}
        loading="lazy"
        className="fixed bottom-[15%] left-[8%] w-16 md:w-24 float-animation-3 opacity-80 pointer-events-none z-0"
      />
      <img
        src={sushiImg}
        alt="Sushi"
        width={80}
        height={80}
        loading="lazy"
        className="fixed bottom-[20%] right-[8%] w-14 md:w-20 float-animation-1 opacity-60 pointer-events-none z-0"
        style={{ animationDelay: "2s" }}
      />
      <img
        src={makiImg}
        alt="Maki"
        width={80}
        height={80}
        loading="lazy"
        className="fixed top-[50%] left-[2%] w-14 md:w-20 float-animation-3 opacity-50 pointer-events-none z-0"
        style={{ animationDelay: "1s" }}
      />
    </>
  );
};

export default FloatingFood;
