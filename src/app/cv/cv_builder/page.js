"use client"
import PersonalInfo from "@/components/modules/cv_resune_builder/personalInfo/PersonalInfo"
import { useSearchParams } from "next/navigation"
// import { CV_DATA } from "../../../../local-json/CvResumeList"
import { CV_RESUME_MENU_LIST } from "../../../../local-json/menuListCv"
// import { AiOutlineCheck } from "react-icons/ai";


const CvBuilder = () => {
 const searchParams = useSearchParams();
 const id = searchParams.get('id');

 // define state to detect current active menu-id
 const [activeMenu, setActiveMenu] = useState(0);
 const [visible, setVisible] = useState(false);


 //  useEffect(() => {
 //   lastAttemptIndex && setActiveMenuItem(lastAttemptIndex);
 // }, [lastAttemptIndex]);

 // this method help us to detect is user submit form successfully, or cancel
  const isCompletedTask = (status = "cancel") => {
    if (activeMenu < 0 || activeMenu > 6) return null;

    if (status === "back") setActiveMenu((prv) => prv - 1);
    else if (status === "next") setActiveMenu((prv) => prv + 1);
    if (process.env.NODE_ENV === "development") console.log(status, "status");

    // scrollToTopMethod();
  };


  return (
    <div>
     <p>CV Builder -- { id }</p>
     <div>
      <PersonalInfo />
     </div>
    </div>
  )
}

export default CvBuilder;
