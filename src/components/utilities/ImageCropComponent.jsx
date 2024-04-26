"use client"
import { useState, createRef, useEffect } from "react";
import { FaImage } from "react-icons/fa";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { AiOutlineClose } from "react-icons/ai";
import { validFileExtensions } from "../../utils/appHelpers";


const ImageCropComponent = ({ visible = false, setVisible, callBack, eventData = null }) => {
    const [image, setImage] = useState("");
    const [cropData, setCropData] = useState("#");
    const cropperRef = createRef();
    const [imageError, setImageError] = useState("");

    useEffect(() => {
        eventData !== null && onChange(eventData);
    }, [eventData]);

    const onChange = (e) => {
        e.preventDefault();

        if (!e?.target?.files?.length) return null;

        if (!validFileExtensions?.includes(e?.target?.files[0]?.type)) {
            setImage("");
            setImageError("This file is not valid");
            return null;
        }

        if (e.target.files[0]?.size > 10 * 1024 * 1024) {
            setImage("");
            setImageError("Image is larger than 10MB");
            return null;
        }

        imageError && setImageError("");

        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const data = cropperRef.current?.cropper
                .getCroppedCanvas({
                    imageSmoothingQuality: "medium",
                    maxHeight: Math.round(809 / (4 / 3)),
                    maxWidth: 809,
                    minWidth: 256,
                    minHeight: 256,
                })
                .toDataURL();

            setCropData(data);
            callBack(data);
            closeModal();
        }
    };

    const closeModal = () => setVisible(false);

    return (
        <>
            {visible && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;

                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <AiOutlineClose
                                    className="close-icon-widget cursor-pointer absolute right-4 top-4"
                                    size={24}
                                    color={"#575C6B"}
                                    onClick={() => {
                                        closeModal();
                                        callBack("");
                                    }}
                                />
                                <div className="image-wrapper">
                                    <div className="custom-img">
                                        {image ? (
                                            <div>
                                                <Cropper
                                                    ref={cropperRef}
                                                    zoomTo={0.1}
                                                    style={{ height: 340, width: "100%" }}
                                                    initialAspectRatio={1}
                                                    preview=".img-preview"
                                                    src={image}
                                                    viewMode={1}
                                                    minCropBoxHeight={1}
                                                    minCropBoxWidth={1}
                                                    background={false}
                                                    responsive={true}
                                                    autoCropArea={1}
                                                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                                    guides={true}
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                <label htmlFor="image-id" className="img-box">
                                                    <FaImage size={60} color="#DDD" />
                                                </label>
                                            </>
                                        )}
                                    </div>
                                    {imageError && (
                                        <p className="text-danger m-0 p-0 mt-2">{imageError}</p>
                                    )}

                                    <div className="button-wrapper flex justify-between items-center mt-4">
                                        <button
                                            onClick={() => {
                                                closeModal();
                                                callBack("");
                                            }}
                                            className="crop-img btn common-btn"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={image ? getCropData : null}
                                            className={`crop-img btn common-btn ${
                                                !image ? "disable-btn" : null
                                            }`}
                                            disabled={!image}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageCropComponent;
