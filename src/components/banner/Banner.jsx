"use client";

// import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react"
import { TextHeader, TextTitle } from "../ui/text/Text";
import OthersBtn from "../ui/buttons/OthersBtn";
// import Resume from "../../../public/assets/images/hand-resume-copy-removebg-preview.png";

const Banner = () => {
  let textHeader = `Whether you're looking to switch careers.`;
  let textTitle = `Say Goodbye to Stressful\n Resume Writing with\n RESUME BUILDER`;

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2; 

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    // Autoplay interval in milliseconds
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change 3000 to the desired autoplay interval

    return () => clearInterval(interval); 
  }, [currentSlide]);

  return (
    <>
      <section className="flex w-full items-center h-screen justify-center bg-fixed mb-12 bg-center bg-cover custom-img relative">
        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/60 z-[2]" />
        <div className="p-5 text-white z-[2] ">
          <div className="grid grid-cols-2 gap-4">
            <div className="ml-14 mt-16">
              <TextHeader textHeader={textHeader} headerPosition={true} />
              <TextTitle textTitle={textTitle} titlePosition={true} />
              <div className="mt-12">
                <Link href="/select-type">
                  <OthersBtn text="Get Started" />
                </Link>
              </div>
            </div>
            <div className="grid justify-items-center">
              {/* <Image className="img-style mb-16" src={Resume} alt="resume-image" />          */}
              <div style={{ position: "relative" }}>
                <div id="left">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <g opacity="0.32" clipPath="url(#clip0_2600_5489)">
                      <path
                        d="M25.1003 12.6963L26.5443 8.14475L29.4593 15.012L25.679 13.8128C25.4542 13.7415 25.267 13.5838 25.1584 13.3744C25.0499 13.165 25.029 12.9211 25.1003 12.6963ZM25.1412 15.508C24.4668 15.294 23.9051 14.821 23.5795 14.1928C23.2539 13.5647 23.1912 12.8329 23.4051 12.1585L25.0185 7.07299L13.9998 3.57742C13.3254 3.36348 12.5937 3.4262 11.9655 3.75178C11.3374 4.07736 10.8643 4.63914 10.6504 5.31352L4.73478 23.9605C4.52084 24.6349 4.58356 25.3666 4.90914 25.9948C5.23472 26.6229 5.7965 27.096 6.47088 27.3099L21.7275 32.15C22.4019 32.3639 23.1336 32.3012 23.7618 31.9756C24.3899 31.65 24.863 31.0882 25.0769 30.4139L29.3792 16.8524L25.1412 15.508Z"
                        fill="#FD6C1F"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2600_5489">
                        <rect
                          width="28.455"
                          height="28.455"
                          fill="white"
                          transform="translate(8.60352) rotate(17.6011)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div id="right">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <g opacity="0.32" clipPath="url(#clip0_2600_4934)">
                      <path
                        d="M20.7968 10.9348L18.1943 7.02025L25.2615 9.01765L22.0104 11.1791C21.817 11.3077 21.5806 11.3541 21.353 11.3083C21.1254 11.2625 20.9253 11.1281 20.7968 10.9348ZM22.9796 12.6371C22.3996 13.0227 21.6902 13.1621 21.0074 13.0246C20.3246 12.8871 19.7244 12.4841 19.3388 11.9041L16.431 7.53027L6.95447 13.8305C6.37447 14.2161 5.97141 14.8163 5.83394 15.4991C5.69648 16.1819 5.83588 16.8913 6.22148 17.4713L16.8834 33.5086C17.269 34.0886 17.8693 34.4916 18.552 34.6291C19.2348 34.7665 19.9442 34.6271 20.5242 34.2415L33.6456 25.5181C34.2256 25.1325 34.6287 24.5323 34.7661 23.8495C34.9036 23.1668 34.7642 22.4573 34.3786 21.8773L26.6245 10.2139L22.9796 12.6371Z"
                        fill="#1268D9"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2600_4934">
                        <rect
                          width="28.0116"
                          height="28.0116"
                          fill="white"
                          transform="translate(0.882812 15.765) rotate(-33.617)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="w-72 carousel rounded-box relative overflow-hidden">
                  <div className="transition-transform duration-500 ease-in-out transform -translate-x-full">
                    <div className="carousel-item w-full">
                      <img
                        src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
                        className="w-full"
                        alt="Tailwind CSS Carousel component"
                      />
                    </div>
                    <div className="carousel-item w-full">
                      <img
                        src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
                        className="w-full"
                        alt="Tailwind CSS Carousel component"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
