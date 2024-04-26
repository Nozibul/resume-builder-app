import Modal from "react-bootstrap/Modal";
import WarningImg from "../public/assets/warnings.png";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/router";

const ChangeTemplatePopUp = ({ visible = false, setVisible, callBack }) => {
    const router = useRouter();

    const closeModal = () => setVisible((prv) => !prv);
    return (
        <>
            <Modal
                className="draft-alert-widget create-new-resume-template-container"
                show={visible}
                backdrop="static"
                keyboard={false}
                onHide={closeModal}
            >
                <Modal.Body>
                    <div className="modal-body-widget text-center">
                        <AiOutlineClose
                            className="icon-widget"
                            size={24}
                            color={"#575C6B"}
                            onClick={() => {
                                callBack("close-pop-up");
                            }}
                        />
                        <div className="header-widget">
                            <div className="img-group ">
                                <Image
                                    src={WarningImg}
                                    width={24}
                                    height={21}
                                    alt="modal-warning-image"
                                    className="img-fluid"
                                />
                                <h1>Create New {router.pathname === "/cv/template-preview" ? "CV" : "Resume"}?</h1>
                            </div>
                            <p>
                                Selecting Create New {router.pathname === "/cv/template-preview" ? "CV" : "Resume"},
                                your content will be permanently deleted
                            </p>
                        </div>
                        <div className="button-group-widget">
                            <div className="btn-group">
                                <button
                                    onClick={() => {
                                        callBack("continue-with-draft");
                                    }}
                                    className="btn btn-styles"
                                >
                                    Continue With Draft
                                </button>
                            </div>
                            {/* <div className="btn-group">
                                <button
                                    onClick={() => {
                                        callBack("create-new-with-draft-content");
                                    }}
                                    className="btn btn-styles draft-content-btn"
                                >
                                    Create New with Draft Content
                                </button>
                            </div> */}
                            <div>
                                <button
                                    onClick={() => {
                                        callBack("crate-new-cv");
                                    }}
                                    className="btn btn-styles new-draft-content-btn"
                                >
                                    Create New {router.pathname === "/cv/template-preview" ? "CV" : "Resume"}
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ChangeTemplatePopUp;
