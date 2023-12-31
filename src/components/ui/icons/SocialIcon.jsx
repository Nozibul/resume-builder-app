import Link from "next/link";
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { RiGlobalFill } from "react-icons/ri";

const SocialIcon = () => {
    const socials = [ 
        {
            id:1,
            link: "/home",
            icon: <FaFacebook />
        },
        {
            id:2,
            link: "/home",
            icon: <FaTwitter />
        },
        {
            id:3,
            link: "/home",
            icon: <FaLinkedinIn />
        },
        {
            id:4,
            link: "/home",
            icon: <RiGlobalFill />
        },
    ]

  return (
    <div className="flex gap-2 mt-4">
        {
            socials?.map((social)=>(
                  <Link key={social.id} href={`${social.link}`} className="social-icon  hover:-translate-y-2
                  hover:bg-orange-700
                  hover:text-white">{social.icon}</Link>
            ))
        }
    </div>
  )
}

export default SocialIcon