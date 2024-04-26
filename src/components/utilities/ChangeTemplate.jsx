import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { CV_DATA, RESUME_DATA } from "../local-json/CvResumeList";
import { AiOutlineClose } from "react-icons/ai";

const ChangeTemplate = ({ visible = false, setVisible, callBack }) => {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    useEffect(() => {
        if (router.pathname === "/cv/cv-builder") {
            setData(CV_DATA);
        } else {
            setData(RESUME_DATA);
        }
    }, [router]);

    const closeModal = () => setVisible((prv) => !prv);

    return (
        <>
            <Modal
                className="change-template-alert-widget"
                show={visible}
                backdrop="static"
                keyboard={false}
                onHide={closeModal}
            >
                <Modal.Body>
                    <div className="body-widget-cng-template">
                        <AiOutlineClose className="icon-widget" size={24} color={"#FFF"} onClick={closeModal} />
                        <div className="row text-center position-relative">
                            {data?.length ? (
                                data?.map((item) => {
                                    return (
                                        <div
                                            key={item.id}
                                            className={`col-sm-6 col-lg-3 img-block text-center py-2  ${
                                                !isImageLoaded ? "image-loader-widget" : null
                                            } `}
                                            onClick={() => {
                                                callBack(item);
                                            }}
                                        >
                                            <Image
                                                className={`img-fluid `}
                                                src={item.imageItem}
                                                alt="cv-image"
                                                height={440}
                                                width={310}
                                                priority={true}
                                                onLoad={(e) => setIsImageLoaded(true)}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <h4>no item is found</h4>
                            )}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ChangeTemplate;
