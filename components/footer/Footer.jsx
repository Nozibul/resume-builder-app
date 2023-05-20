
import { FaPhoneVolume, FaSms, FaLocationArrow } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import SocialIcon from "../ui/icons/SocialIcon";
import { TextHeader } from "../ui/text/Text";


const FooterPage = () => {
  const supports = [ 
    
               {
                pages:"Contact Us",
                link: "/contact"

               },
               {
                pages:"Our Guide", 
                link: "/guide"

               },
               {
                pages:"Packages",
                link: "/packages"

               },
               {
                pages:"Our Blog",
                link: "/blog"

               },
            
       ];

    return (
        <div className='footer-bg bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100 via-violet-500 to-sky-900'>  
            <div className="grid grid-cols-4 w-10/12 gap-4 mx-auto">
              
                <div className='w-64 mt-24 text-white item-center'>
                  <p className="mt-4 ">Lorem ipsum dolor sit amet conse ctetur, 
                    adipisicing elit. Ipsum harum doloribus animi!
                  </p>
                  <div className="mt-5">
                   <span className="text-2xl font-bold font-serif text-orange-500">Follow Us:</span>
                   <div>
                     <SocialIcon /> 
                   </div>
                  </div>
                </div>

                <div className='w-60 text-white  '>
                  <TextHeader textHeader="Support" />
                   <div className="mt-6 ml-10">
                    { supports?.map((support)=><Link key={support.pages} className='footer-support hover:-translate-y-1 icon-hover' href={`${support.link}`}>{support.pages}</Link>)}
                   </div>
                </div>

                <div className='w-60 text-white item-center'>
                <TextHeader textHeader="Contact Us" />

                     <div className='footerContact '>
                        <p><FaPhoneVolume className='footerIcon '></FaPhoneVolume></p>
                           <Link className="flex flex-col" href="/">
                            <p>+8801955555441</p>
                            <p>+8801987554445</p>
                           </Link>
                     </div>

                     <div className='footerContact '>
                       <p><FaSms className='footerIcon '></FaSms> </p>
                          <Link href="/">                          
                          luxury@gmail.com <br />
                          support@luxury.com
                          </Link>
                     </div>

                     <div className='footerContact'>
                        <p><FaLocationArrow className='footerIcon'></FaLocationArrow> </p>
                           <Link href="/">                             
                                2752 Willison Street <br />
                                Eagan, United State.
                           </Link>
                     </div>
                </div>

                <div className='w-64 mt-24 text-white item-center'>
                  {/* <img className="h-20" src={logo} alt="" /> */}
                  <p className="mt-4 ">Lorem ipsum dolor sit amet conse ctetur, 
                    adipisicing elit. Ipsum harum doloribus animi!
                  </p>
                  <div className="mt-5">
                   <span className="text-2xl font-bold font-serif text-orange-500">Follow Us:</span>
                   <div>
                     <SocialIcon /> 
                   </div>
                  </div>
                </div>
              
            </div>
               <div className='w-10/12 mx-auto mt-8'>
                  <hr className="text-white" />
                  <div className="w-[450px] mx-auto ">
                   <small className='text-white'> Copyright&copy; 2023 Resume Builder | Developed By Nozibul Islam</small>
                  </div>
              </div>
        </div>
    );
};

export default FooterPage;