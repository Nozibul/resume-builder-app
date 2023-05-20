import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { RiGlobalFill } from "react-icons/ri";
import Link from "next/link";

const SocialIcon = () => {
    const socials = [ 
        {
            id:1,
            link: "/",
            icon: <FaFacebook />
        },
        {
            id:2,
            link: "/",
            icon: <FaTwitter />
        },
        {
            id:3,
            link: "/",
            icon: <FaLinkedinIn />
        },
        {
            id:4,
            link: "/",
            icon: <RiGlobalFill />
        },
    ]

  return (
    <div className="flex gap-2 mt-4">
        {
            socials?.map((social)=>(
                  <Link key={social.id} href={`${social.link}`} className="social-icon icon-hover" >{social.icon}</Link>
            ))
        }
    </div>
  )
}

export default SocialIcon