import { FaPhoneVolume, FaSms } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import SocialIcon from "../ui/icons/SocialIcon";
import { TextHeader } from "../ui/text/Text";
import footerLogo from "../../../public/assets/cv-footer.png";

const FooterPage = () => {
  const supports = [
    {
      pages: "Contact Us",
      link: "/contact",
    },
    {
      pages: "Terms of Service",
      link: "/contact",
    },

    {
      pages: "Privacy Policy",
      link: "/contact",
    },
  ];

  return (
    <div className="pt-14 pb-14 relative z-[-1] bg-[#1b3131]">
      <div className="grid grid-cols-4 w-10/12 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-4 mx-auto">
        <div className="text-white item-center">
          <div className="mt-4">
            <div className="w-6/12 lg:-ml-1 md:-ml-4">
              <TextHeader textHeader="Follow Us" />
            </div>
            <div className="pt-2">
              <SocialIcon />
            </div>
          </div>
          <p className="mt-4 text-sm font-thin">
            Create polished resumes effortlessly with Resume Builder. Enjoy
            unlimited template exports for free, offering endless options to
            showcase your skills.
          </p>
        </div>

        <div className=" text-white">
          <div className="w-8/12 lg:ml-1 md:-ml-8">
            <TextHeader textHeader="Support" />
          </div>
          <div className="pt-2 mt-6">
            {supports?.map((support) => (
              <Link
                key={support.pages}
                className="w-8/12 mt-2 flex flex-col place-items-start mx-auto text-base font-thin hover:-translate-y-1 transition duration-300 delay-200 ease-in-out"
                href={`${support.link}`}
              >
                {support.pages}
              </Link>
            ))}
          </div>
        </div>

        <div className=" text-white item-center">
          <div className="w-6/12 lg:-ml-4 md:-ml-8">
            <TextHeader textHeader="Contact" />
          </div>

          <div className="flex items-center text-white mt-10 ">
            <p>
              <FaPhoneVolume className="footerIcon "></FaPhoneVolume>
            </p>
            <div className="flex flex-col font-thin" href="/">
              <p>+88-01955544331</p>
              <p>+88-01987578445</p>
            </div>
          </div>

          <div className="flex items-center text-white mt-6 ">
            <p>
              <FaSms className="footerIcon "></FaSms>{" "}
            </p>
            <Link className="font-thin" href="/">
              resumebuilder@gmail.com 
            </Link>
          </div>

        </div>

        <div className="text-white item-center">
          <Image
            className="w-32 h-32 mx-auto mt-10"
            src={footerLogo}
            alt="Footer Logo"
          />
        </div>
      </div>
      <div className="w-10/12 mx-auto mt-10">
        <hr className="text-white" />
        <div className="w-[450px] mx-auto ">
          <small className="text-white ml-8">
            {" "}
            Copyright&copy; 2024 Resume Builder | Developed By Nozibul Islam
          </small>
        </div>
      </div>
    </div>
  );
};
export default FooterPage;
