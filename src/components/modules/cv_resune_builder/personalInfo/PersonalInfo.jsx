import { yupResolver } from "@hookform/resolvers/yup";
import Compressor from "compressorjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import Api from "../../../../../api-config/instance";
import jwtService from "../../../../../api-config/jwtService";
import { isValidUrl, phoneRegExp, validFileExtensions, validURLRegex } from "../../../../utils/appHelpers";
import { socialList } from "../../../../../local-json/socialList";
import { storePersonalInfo } from "../../../../redux/features/cvSlice/cvSlice";
import { storeCVId } from "../../../../redux/features/globalSlice";
import ImageCropComponent from "../../../../components/utilities/ImageCropComponent";

// Create a separate validation function for socialLink
const validateSocialLink = (websiteName, socialLink) => {
    if (websiteName?.length) {
        return yup
            .string()
            .required("This field is required")
            .matches(validURLRegex, "Please provide a valid URL")
            .max(150, "The number is too long");
    } else {
        return yup.string().notRequired();
    }
};

const schema = yup.object().shape(
    {
        firstName: yup
            .string()
            .required("First name is a required field")
            .min(1, "First name is too short")
            .max(30, "First name is too long"),

        lastName: yup.string().when("lastName", (value, schema) => {
            if (value[0]?.length) {
                return yup
                    .string()
                    .required("Last name is a required field")
                    .min(1, "Last name is too short")
                    .max(30, "Last name is too long");
            } else return yup.string().notRequired();
        }),

        profession: yup
            .string()
            .required("Profession is a required field")
            .min(1, "Profession is too short")
            .max(60, "Profession is too long"),
        email: yup.string().email().required("Email is a required field").max(120, "Email is too long"),

        phone: yup.string().when("phone", (value, schema) => {
            if (value[0]?.length) {
                return yup
                    .string()
                    .matches(phoneRegExp, "Phone number is not valid")
                    .min(1, "The number is too short")
                    .max(20, "The number is too long");
            } else return yup.string().notRequired();
        }),

        address: yup.string().when("address", (value, schema) => {
            if (value[0]?.length) {
                return yup
                    .string()
                    .required("Address is a required field")
                    .min(1, "The length to short")
                    .max(150, "The length is too long");
            } else return yup.string().notRequired();
        }),

        postCode: yup.string().when("postCode", (val, schema) => {
            if (val[0]?.length) {
                return yup
                    .string()
                    .required("Post is a required field")
                    .min(1, "The length to short")
                    .max(15, "The length is too long");
            } else return yup.string().notRequired();
        }),
        aboutSelf: yup
            .string()
            .required("Please write something about your self")
            .min(1, "The length to short")
            .max(700, "The length is too long"),

        profileImage: yup
            .mixed()
            .test("fileType", "Image is not valid", (value) => {
                if (!value || !value?.length) return true; // allow empty file
                // if (value?.length != 1 && value[0]?.includes("data:image")) return true;
                if (value && value?.length != 1 && value?.includes("data:image")) return true;
                if (isValidUrl(value)) return true;

                return validFileExtensions?.includes(value[0]?.type);
            })
            .test("is-valid-size", "Max allowed size is 10MB", (value) => {
                if (value?.length && typeof value === "string") return true;
                if (!value || !value?.length) return true;
                return value && value[0]?.size <= 10 * 1024 * 1024;
            })
            .nullable(true),

        socialLinkList: yup.array().of(
            yup.object().shape(
                {
                    websiteName: yup.string().when("websiteName", (val) => {
                        if (val[0]?.length) {
                            return yup
                                .string()
                                .required("Name is a required")
                                .min(1, "The length to short")
                                .max(30, "The length is too long");
                        } else return yup.string().notRequired();
                    }),

                    socialLink: yup.string().when("websiteName", {
                        is: (websiteName) => websiteName?.length,
                        then: validateSocialLink,
                    }),

                },
                [
                    ["websiteName", "websiteName"],
                    ["socialLink", "socialLink"],
                ]
            )
        ),
    },
    //cyclic dependency
    [
        ["lastName", "lastName"],
        ["phone", "phone"],
        ["country", "country"],
        ["city", "city"],
        ["address", "address"],
        ["postCode", "postCode"],
    ]
);

const PersonalInfo = ({ callBackMethod }) => {
    // define dispatch from react-redux
    const dispatch = useDispatch();
    const router = useRouter();

    const { _id = null } = router.query;

    // define useSelector
    const {
        cvData,
        cvData: {
            // experience = [],
            education = [],
            // projectPortfolio = [],
            Skills: { listOfSkills = [], technologies = [] } = {},
        },
    } = useSelector((state) => state.cvSlice);
    const {
        isLoggedIn = false,
        cvIdFromApi = null,
        cvGetPersonalInfoId = null,
    } = useSelector((state) => state.globalSlice);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        getValues,
        unregister,
        setError,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema)});

    const [listOfSocialLink, setListOfSocialLink] = useState([
        {
            id: Math.floor(Math.random() * 949654),
            websiteName: "",
            socialLink: "",
        },
    ]);

    const [attachment, setAttachment] = useState(null);
    const [loading, setLoading] = useState(false);
    const [aboutYourSelfTxt, setAboutYourSelfTxt] = useState("");
    const [imageErrorMessage, setImageErrorMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const [imageLoader, setImageLoaded] = useState(true);
    const [imageError, setImageError] = useState("");
    const [imageFileData, setImageFileData] = useState(null);
    const [isSubmitBtnActive, setSubmitBtnActive] = useState(null);
    const [clickedOnExitBtn, setClickOnExitBtn] = useState(false);

    const imgRef = useRef();

    useEffect(() => {
        const subscription = watch((value, { name, type }) => {
            if (name === "profileImage") {
                // mark error message initial state
                setImageErrorMessage("");

                if (!value?.profileImage) {
                    return null;
                    // return setAttachment("");
                }

                if (value?.profileImage?.length === 0) {
                    setValue("profileImage", cvData?.personalInfo?.profileImage);
                    setAttachment(cvData?.personalInfo?.profileImage);
                    return null;
                }
              
                if (value?.profileImage && typeof value?.profileImage === "string") {
                    if (isValidUrl(value?.profileImage)) {
                        return setAttachment(value?.profileImage);
                    }
                    return setAttachment("");
                }

                // Optimize-image
                const file = value.profileImage[0];

                if (!file) {
                    return;
                }

                if (!validFileExtensions?.includes(file?.type)) {
                    setAttachment(URL.createObjectURL(value.profileImage[0]));
                    return setImageErrorMessage("Invalid image type");
                }

                // check image size
                if (file?.size >= 10 * 1024 * 1024) {
                    setAttachment(URL.createObjectURL(value.profileImage[0]));
                    return setImageErrorMessage("Upload Failed!! Max size for image is 10MB");
                }

                // Check 512KB of Image
                const fileSizeKB = file.size / 1024 > 512;

                // if (fileSizeKB) {
                new Compressor(file, {
                    quality: fileSizeKB ? 0.2 : 1,
                    convertTypes: ["image/jpg", "image/png", "image/jpeg"],
                    // convertSize: Infinity,
                    width: 512,
                    height: 512,

                    // The compression process is asynchronous,
                    // which means you have to access the `result` in the `success` hook function.
                    success(result) {
                        setValue(
                            "profileImage",
                            new File([result], `${Math.random(Math.floor() ** 465499) + ".jpg"}`, { type: "image/jpg" })
                        );
                    },
                    error(err) {
                        if (process.env.NODE_ENV === "development") console.log(err.message);
                    },
                });
                setAttachment(URL.createObjectURL(file));

            }
        });
        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch, cvData.personalInfo]);

    //get cv-personal info data from api
    useEffect(() => {
        // if (isLoggedIn) {
        // get personal info data from api
        if (!Object.keys(cvData.personalInfo)?.length && cvIdFromApi) getPersonalInfoData(cvIdFromApi, dispatch, _id);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cvIdFromApi, isLoggedIn]);

    useEffect(() => {
        if (Object.keys(cvData.personalInfo)?.length) {
            for (const item in cvData.personalInfo) {
                if (item === "socialLinkList") {
                    setListOfSocialLink(cvData.personalInfo[item]);
                    setValue("socialLinkList", cvData.personalInfo[item]);

                    if (!cvData.personalInfo[item]?.length) {
                        setListOfSocialLink([
                            {
                                id: Math.floor(Math.random() * 949654),
                                websiteName: "",
                                socialLink: "",
                            },
                        ]);
                    }
                } else {
                    setValue(item, cvData.personalInfo[item]);
                }
                if (item === "aboutSelf") {
                    setAboutYourSelfTxt(cvData.personalInfo[item]);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cvData.personalInfo]);


    useEffect(() => {
        getSubmitButtonStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [education, listOfSkills, technologies]);

    // method to add more social link
    const addMoreSocialLinkMethod = () => {
        const item = {
            id: Math.floor(Math.random() * 949654),
            websiteName: "",
            socialLink: "",
        };
     
        return setListOfSocialLink((prv) => [...prv, item]);
    };

    //delete item from list of social link
    const deleteSocialLink = (id, index) => {
        // if (listOfSocialLink?.length < 2) return toast.error("Please provide at least one filed");
        setListOfSocialLink((prv) => prv.filter((item) => item.id !== id));

        // also need to unregister from hook-form
        unregister(`socialLinkList[${index}].websiteName`, { keepDefaultValue: false });
        unregister(`socialLinkList[${index}].socialLink`, { keepDefaultValue: false });
    };

    // submit form
    const onSubmit = (data, e) => {
        e.preventDefault();
        if (loading) return null;

        // update image path as URL
        data = { ...data, profileImage: attachment, socialLinkList: listOfSocialLink };

        //destruct property form hook-form
        const { socialLinkList = [] } = getValues();
        let isBlocker = false;

        for (let i = 0; i < socialLinkList?.length; i++) {
            if (!socialLinkList[i]?.websiteName?.length && socialLinkList[i]?.socialLink?.length) {
                isBlocker = true;
                // learn hook from https://react-hook-form.com/docs/useform/seterror
                setError(`socialLinkList[${i}].websiteName`, { type: "custom", message: "This field is required" });
            }
        }

        //if any block is not happened
        if (!isBlocker) {
            makeApiRequestOfPersonalInfo(data);
        }

    };

    // this method for clear image after user selected for his/her as profile avatar
    const clearImageMethod = () => {
        setAttachment(null);
        setValue("profileImage", null);
    };



    const methodToStoreSocialData = ({ value, id, filedName, index }) => {
        // console.log(value, id, filedName, index);
        const copyData = [...listOfSocialLink];

        copyData[index] = {
            ...copyData[index],
            [filedName]: value,
        };
        setListOfSocialLink(copyData);
    };


    const makeApiRequestOfPersonalInfo = async (data) => {
        let social_links = {};

        const body = {
            first_name: data.firstName?.trim(),
            last_name: data.lastName?.trim(),
            email: data.email?.trim(),
            phone: data.phone?.trim(),
            profession: data.profession,
            // city: data.city,
            // country: data.country,
            address: data.address?.trim(),
            post_code: data.postCode,
            about: data.aboutSelf?.trim(),
            template_id: _id,
        };

        if (!data.phone?.trim()?.length) delete body.phone;

        try {
            // start loader
            setLoading((prv) => !prv);

            // destruct property from data
            const { socialLinkList = [] } = data;

            // destruct property from react-hook forms
            const { profileImage = "" } = getValues();

            if (socialLinkList?.length) {
                let removedEmptyData = [];

                for (let i = 0; i < socialLinkList?.length; i++) {
                    // if any empty link is resent, need to unregister it
                    if (!socialLinkList[i].websiteName?.length || !socialLinkList[i].socialLink?.length) {
                        // unregister component
                        unregister(`socialLinkList[${i}].websiteName`, { keepDefaultValue: false });
                        unregister(`socialLinkList[${i}].socialLink`, { keepDefaultValue: false });
                        // delete it from social link also
                        // setListOfSocialLink((prv) => prv.filter((item) => item.id !== socialLinkList[i]?.id));
                    } else {
                        removedEmptyData = [...removedEmptyData, socialLinkList[i]];
                        social_links[socialLinkList[i].websiteName] = socialLinkList[i].socialLink;
                    }
                }

                // update data-social-link
                data.socialLinkList = removedEmptyData;
            }

            const formData = new FormData();

            let isProfileImageUpdate = false;

            if (profileImage !== null && typeof profileImage != "object")
                isProfileImageUpdate = Boolean(profileImage?.includes("base64") || profileImage?.length > 200);

            if (isProfileImageUpdate) {
                formData.append("image", profileImage);
            }

            formData.append("social_links", JSON.stringify(social_links, null, 2));

            for (const key in body) {
                formData.append(key, body[key]);
            }

            //if id is present we need to update it
            const apiType =
                cvIdFromApi && cvGetPersonalInfoId
                    ? `/api/v1/cv/${cvIdFromApi}/personal-info/${cvGetPersonalInfoId}`
                    : "/api/v1/cv/personal-info";

            const response = await Api.post(apiType, formData, {
                headers: {
                    "Content-Type": "multipart/form-data; ",
                },
            });

            if (!isLoggedIn && response.data?.status_code === 200 && !cvIdFromApi && !cvGetPersonalInfoId) {
                const guestId = jwtService.getGuestId();
                if (!guestId) {
                    //destruct property from response
                    const { data: { guest_id = "" } = {} } = response?.data;

                    const setHeader = "guest_id-" + guest_id;

                    // jwtService.setSession(setHeader, {});
                    jwtService.setGuestId(setHeader);
                }
            }

            // store cv id into redux-store,

            // response?.data?.data?.cv_id -> mean we are at update method
            if (response?.data?.data?.cv_id && !cvIdFromApi && !cvGetPersonalInfoId) {
                dispatch(
                    storeCVId({
                        cvId: response.data?.data?.cv_id,
                        personalInfoId: response.data?.data?.personal_info?.id,
                    })
                );
            }

            toast.success(response.data.message || "personal info saved successfully");

            // store into redux-store and redirect for next approach
            // store data into redux

            const isUpdateMode = Boolean(cvIdFromApi && cvGetPersonalInfoId);

            // is image is present
            const isImgURLIsString = Boolean(profileImage === null);

            data.profileImage = isUpdateMode
                ? isImgURLIsString
                    ? null
                    : response.data?.data?.image || ""
                : response.data?.data?.personal_info?.image || "";

            dispatch(storePersonalInfo({ data, activeIndex: 0, cvTemplateId: _id }));

            if (isSubmitBtnActive && clickedOnExitBtn) {
                return router.push({
                    pathname: "/cv/cv-preview",
                    query: { _id },
                });
            } else {
                if (typeof callBackMethod === "function") callBackMethod("next");
            }

            // stop loader
            setLoading((prv) => !prv);
        } catch (errors) {
            // stop loader
            setLoading((prv) => !prv);

            if (errors?.response?.data?.errors?.about?.length) {
                toast.error(
                    errors?.response?.data?.errors?.about?.[0] || "Something went wrong. please try again later"
                );
                setError(`aboutSelf`, { type: "custom", message: errors?.response?.data?.errors?.about?.[0] });
            } else if (errors?.response?.data?.errors?.phone?.length) {
                toast.error(
                    errors?.response?.data?.errors?.phone?.[0] || "Something went wrong. please try again later"
                );
                setError(`phone`, { type: "custom", message: errors?.response?.data?.errors?.phone?.[0] });
            } else if (Object.entries(errors?.response?.data?.errors)) {
                for (const [key, value] of Object.entries(errors?.response?.data?.errors)) {
                    toast.error(value?.[0] || "Something went wrong. please try again later");
                }
            } else toast.error(errors?.response?.data?.message || "Something went wrong. please try again later");

            if (process.env.NODE_ENV === "development") console.log(errors, "from catch errors");
        }
    };

    // const navigateToBack = () => router.back();

    const getImage = (e) => {
        setValue("profileImage", e);

        if (!e) {
            setImageFileData("");
            imgRef.current.value = "";
            if (cvData?.personalInfo?.profileImage) setValue("profileImage", cvData?.personalInfo?.profileImage);
        }
    };

    // // Method to get active/in-active submit button
    const getSubmitButtonStatus = () => {
        /** check empty list of data */
        const isEducationEmpty = Boolean(education?.length > 0);
        const isSkillsEmpty = Boolean(listOfSkills?.length > 0 && technologies?.length > 0);

        const isActive = Boolean(isEducationEmpty && isSkillsEmpty);

        setSubmitBtnActive(isActive);
    };

    return (
        <div id="cv-personal-info-container" className="p-4">
            {visible && (
                <ImageCropComponent
                    visible={visible}
                    setVisible={setVisible}
                    callBack={getImage}
                    eventData={imageFileData}
                />
            )}

            <div className="heading-widget pb-0">
                <h3 className="pb-0 pb-md-1">Enter Personal Information</h3>
                <p>Tell Us About Yourself</p>
            </div>
            <div className="form-widget">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="image-form-group">
                        <div className="row">
                            <div className="col-xl-3 gx-1">
                                <div className="custom-file">
                                    <div className="image-with-delete-icon-wrapper">
                                        <p>Image</p>
                                        {attachment ? (
                                            <div className="del-icon">
                                                <RiDeleteBin6Line
                                                    size={13}
                                                    color="#FD4D45"
                                                    onClick={clearImageMethod}
                                                />
                                            </div>
                                        ) : null}
                                    </div>

                                    <div className="input-label">
                                        <label
                                            className={`position-relative custom-file-label-box ${
                                                errors.profileImage?.message ? "border-danger" : null
                                            }`}
                                            htmlFor="profile-image-field"
                                        >
                                            {!attachment ? (
                                                // <RiContactsBook2Fill size={35} color="#9CA2B1" />

                                                <Image
                                                    src={"/assets/person_default_image.png"}
                                                    alt="default-avatar"
                                                    className="img-fluid"
                                                    height={160}
                                                    width={150}
                                                    style={{ objectFit: "cover" }}
                                                    onLoad={() => {
                                                        setImageLoaded(false);
                                                    }}
                                                />
                                            ) : (
                                                <div className="image-loader-wrapper">
                                                    <Image
                                                        src={attachment}
                                                        height={160}
                                                        width={150}
                                                        className="img-fluid"
                                                        alt="images"
                                                        onLoad={() => {
                                                            setImageLoaded(false);
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            {imageLoader ? (
                                                <div className="d-flex justify-content-center align-items-center w-100 h-100 position-absolute top-0">
                                                    <div>
                                                        <div className="spinner-border spinner-widget" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </label>

                                
                                    </div>

                                    <p className="pt-1 m-0 text-danger" style={{ wordBreak: "break-word" }}>
                                        {imageError || errors.profileImage?.message || imageErrorMessage}
                                    </p>
                                    <label
                                        className="custom-file-label-btn custom-button"
                                        htmlFor="profile-image-field"
                                    >
                                        Upload photo
                                    </label>
                                    <input
                                        ref={imgRef}
                                        onChange={(e) => {
                                            if (!e?.target?.files?.length) {
                                                setImageError("");
                                                setImageFileData("");
                                                if (cvData?.personalInfo?.profileImage)
                                                    setValue("profileImage", cvData?.personalInfo?.profileImage);
                                                return null;
                                            }

                                            if (!validFileExtensions?.includes(e?.target?.files[0]?.type)) {
                                                setAttachment("");
                                                setImageFileData("");
                                                setImageError("This file is not valid");
                                                return null;
                                            }

                                            if (e.target.files[0]?.size > 10 * 1024 * 1024) {
                                                setAttachment("");
                                                setImageFileData("");
                                                setImageError("Upload Failed!! Max size for image is 10MB");
                                                return null;
                                            }

                                            imageError && setImageError("");
                                            setImageFileData(e);
                                            setVisible(true);
                                        }}
                                        name="profileImage"
                                        accept="image/jpg, image/png, image/jpeg"
                                        type="file"
                                        className={`custom-file-input  d-none`}
                                        id="profile-image-field"
                                    />
                                </div>
                            </div>
                            <div className="col-xl-9">
                                <div className="form-group-widget">
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-6 pb-3 pb-md-0">
                                                <div className="group-box ">
                                                    <label htmlFor="first-name">
                                                        First name <span className="required-sign">*</span>
                                                    </label>
                                                    <input
                                                        // autoComplete="off"
                                                        placeholder="John"
                                                        {...register("firstName")}
                                                        className={`form-control ${
                                                            errors.firstName?.message ? "border-danger" : null
                                                        }`}
                                                        id="first-name"
                                                        type="text"
                                                    />
                                                    <p className="m-0 p-0 mt-1">{errors.firstName?.message}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="last-name">Last name</label>
                                                <input
                                                    placeholder="Doe"
                                                    {...register("lastName")}
                                                    className={`form-control ${
                                                        errors.lastName?.message ? "border-danger" : null
                                                    }`}
                                                    id="last-name"
                                                    type="text"
                                                />
                                                <p>{errors.lastName?.message}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="profession-name">
                                                    Profession <span className="required-sign">*</span>
                                                </label>
                                                <input
                                                    placeholder="Product Manager"
                                                    {...register("profession")}
                                                    className={`form-control ${
                                                        errors.profession?.message ? "border-danger" : null
                                                    }`}
                                                    id="profession-name"
                                                    type="text"
                                                />
                                                <p>{errors.profession?.message}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label htmlFor="email-field">
                                                    Email <span className="required-sign">*</span>
                                                </label>
                                                <input
                                                    placeholder="johndoe@gmail.com"
                                                    {...register("email")}
                                                    className={`form-control ${
                                                        errors.email?.message ? "border-danger" : null
                                                    }`}
                                                    id="email-field"
                                                    type="email"
                                                />
                                                <p>{errors.email?.message}</p>
                                            </div>
                                            <div className="col-sm-6">
                                                <label htmlFor="phone-field">Phone number</label>
                                                <input
                                                    placeholder="202-555-0145"
                                                    {...register("phone")}
                                                    className={`form-control ${
                                                        errors.phone?.message ? "border-danger" : null
                                                    }`}
                                                    id="phone-field"
                                                    // type="number"
                                                />
                                                <p>{errors.phone?.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="address-widget">
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="city-field">Address</label>
                                    <input
                                        placeholder="Enter your address"
                                        {...register("address")}
                                        className={`form-control ${errors.address?.message ? "border-danger" : null}`}
                                        id="city-field"
                                        type="text"
                                    />
                                    <p>{errors.address?.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="about-your-self-widget">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="self-field">
                                        About yourself <span className="required-sign">*</span>
                                    </label>
                                    <textarea
                                        placeholder="Write a short summary about yourself"
                                        {...register("aboutSelf", {
                                            onChange: (e) => setAboutYourSelfTxt(e.target.value),
                                        })}
                                        id="self-field"
                                        className={`form-control ${errors.aboutSelf?.message ? "border-danger" : null}`}
                                        rows="6"
                                        maxLength={700}
                                        // required
                                    ></textarea>
                                    <div className="d-flex justify-content-between">
                                        <p>{errors.aboutSelf?.message}</p>
                                        <p className="p-0 m-0 text-black text-area-char-limit-txt-widget">
                                            {aboutYourSelfTxt?.length + " / " + 700}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="social-widget">
                        <div id="global-title-with-timer-icon-widget" className="personal-info-social-link">
                            <h4 className="title-widget"> Add social/portfolio links .</h4>

                            <div className="svg-widget">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 14 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_1515_20727)">
                                        <path
                                            d="M12.2716 6.99385C12.2716 6.76733 12.4552 6.58369 12.6817 6.58369H13.9936C13.8994 4.96027 13.2499 3.48359 12.2328 2.34084L11.3075 3.26605C11.1473 3.42623 10.8877 3.42623 10.7275 3.26605C10.5673 3.10587 10.5673 2.84618 10.7275 2.686L11.6527 1.7608C10.51 0.743613 9.03329 0.0941992 7.40986 0V1.31182C7.40986 1.53833 7.22622 1.72197 6.99971 1.72197C6.77319 1.72197 6.58955 1.53833 6.58955 1.31182V0C4.96613 0.0941992 3.48945 0.743613 2.3467 1.7608L3.27191 2.686C3.43209 2.84618 3.43209 3.10587 3.27191 3.26605C3.11173 3.42623 2.85204 3.42623 2.69186 3.26605L1.76666 2.34084C0.749473 3.48359 0.100059 4.96027 0.00585938 6.58369H1.31768C1.54419 6.58369 1.72783 6.76733 1.72783 6.99385C1.72783 7.22036 1.54419 7.404 1.31768 7.404H0.00585938C0.100059 9.02743 0.749473 10.5041 1.76666 11.6468L2.69189 10.7216C2.85207 10.5614 3.11175 10.5614 3.27193 10.7216C3.43211 10.8818 3.43211 11.1415 3.27193 11.3017L2.34673 12.2269C3.58502 13.3291 5.21536 14 6.99971 14C8.78405 14 10.4144 13.3291 11.6527 12.2269L10.7275 11.3017C10.5673 11.1415 10.5673 10.8818 10.7275 10.7216C10.8877 10.5614 11.1474 10.5614 11.3076 10.7216L12.2328 11.6468C13.25 10.5041 13.8994 9.0274 13.9936 7.40398H12.6817C12.4552 7.404 12.2716 7.22036 12.2716 6.99385ZM8.31768 11.3641H5.68174C5.45522 11.3641 5.27158 11.1804 5.27158 10.9539C5.27158 10.7274 5.45522 10.5437 5.68174 10.5437H8.31768C8.54419 10.5437 8.72783 10.7274 8.72783 10.9539C8.72783 11.1804 8.54419 11.3641 8.31768 11.3641ZM9.77502 9.77528C9.71414 9.83615 9.63566 9.87633 9.55069 9.89012C9.46572 9.90391 9.37856 9.89061 9.30156 9.85212C9.04111 9.72188 6.73808 8.56103 6.08848 7.91142C5.58598 7.40893 5.58598 6.59127 6.08848 6.08877C6.59097 5.58627 7.40863 5.58625 7.91113 6.08874C8.56073 6.73835 9.72161 9.04138 9.85185 9.30182C9.89035 9.37882 9.90364 9.46598 9.88985 9.55095C9.87606 9.63593 9.83589 9.71441 9.77502 9.77528Z"
                                            fill="#9CA2B1"
                                        />
                                        <path
                                            d="M6.66825 6.66873C6.4856 6.85139 6.48557 7.14862 6.66825 7.33127C6.95719 7.62021 7.76731 8.10053 8.50603 8.50648C8.10008 7.76776 7.61973 6.95765 7.33082 6.66871C7.14813 6.48608 6.85091 6.48608 6.66825 6.66873Z"
                                            fill="#9CA2B1"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1515_20727">
                                            <rect width="14" height="14" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>

                            <p className="max-txt">Maximum 5</p>
                        </div>

                        <div className="render-social-list">
                            {listOfSocialLink?.map((item, index) => {
                                return (
                                    <div className="row" key={item.id}>
                                        <div className="col-lg-3 ">
                                            <div className="form-group">
                                                <label htmlFor="social-website-field">Select name</label>
                                  
                                                <div className="drop-dwn-widget pb-2 pb-sm-0">
                                                    <select
                                                        {...register(`socialLinkList[${index}].websiteName`, {
                                                            onChange: (e) => {
                                                                methodToStoreSocialData({
                                                                    value: e.target.value,
                                                                    id: item.id,
                                                                    filedName: "websiteName",
                                                                    index,
                                                                });
                                                            },
                                                        })}
                                                        className={`form-select`}
                                                        aria-label="Default select example"
                                                        defaultValue={""}
                                                        style={
                                                            item.websiteName
                                                                ? { backgroundColor: "#fff", opacity: 1 }
                                                                : null
                                                        }
                                                    >
                                                        <option value={""} disabled>
                                                            Select one
                                                        </option>
                                                        {socialList?.length
                                                            ? socialList.map((item) => {
                                                                  return (
                                                                      <option value={item.value} key={item.id}>
                                                                          {item.label}
                                                                      </option>
                                                                  );
                                                              })
                                                            : null}
                                                    </select>
                                                </div>
                                                <p>{errors?.socialLinkList?.[index]?.websiteName?.message}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-8 col-11">
                                            <div className="form-group">
                                                <div>
                                                    <label htmlFor="social-link-field">link</label>
                                                    <input
                                                        placeholder="www.linkedin.com/johndoe"
                                                        className={`form-control`}
                                                        id="social-link-field"
                                                        type="text"
                                                        {...register(`socialLinkList[${index}].socialLink`, {
                                                            onChange: (e) => {
                                                                methodToStoreSocialData({
                                                                    value: e.target.value,
                                                                    id: item.id,
                                                                    filedName: "socialLink",
                                                                    index,
                                                                });
                                                            },
                                                        })}
                                                    />
                                                    <p>{errors?.socialLinkList?.[index]?.socialLink?.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-1 text-center">
                                            <div
                                                style={{ marginTop: 37 }}
                                                className="delete-btn"
                                                onClick={() => deleteSocialLink(item.id, index)}
                                            >
                                                <RiDeleteBin6Line size={20} color="#FD4D45" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className={`add-social-btn `}>
                                <div
                                    onClick={listOfSocialLink?.length > 4 ? null : addMoreSocialLinkMethod}
                                    className={`button-add-widget ${
                                        listOfSocialLink?.length > 4 ? "de-active-btn" : null
                                    }`}
                                >
                                    {!listOfSocialLink?.length ? "Add here" : "+Add one more"}
                                </div>
                                <p className="remain-portion"> &nbsp; Remaining {5 - listOfSocialLink?.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="btn-widget d-flex flex-column flex-lg-row justify-content-between">
                        <button
                            onClick={
                                //navigateToBack
                                null
                            }
                            type="button"
                            className="btn custom-button-n cancel-btn-n"
                        >
                            {/* Back */}
                        </button>

                        <div className="button-group-wrapper">
                            {isSubmitBtnActive ? (
                                <button
                                    onClick={() => {
                                        setClickOnExitBtn(true);
                                    }}
                                    type="submit"
                                    className="btn save-exit-btn me-4 me-xl-5"
                                >
                                    {clickedOnExitBtn && loading ? "loading..." : "Save and Exit"}
                                </button>
                            ) : null}
                            <button type="submit" className="btn custom-button personal-next-btn">
                                {!clickedOnExitBtn && loading ? "loading..." : "Next"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

/**
 * description :- Get cv-personal info data from api
 * @author RiseUpLabs
 * @created_by :- {Al-Amin}
 * @created_at :- 29/05/2023 12:56:14
 */
export const getPersonalInfoData = async (id, dispatch, template_id = null) => {
    try {
        const res = await Api.get(`/api/v1/cv/${id}/personal-info`);

        if (res.data.status_code === 200) {
            // destruct property from response
            const { data = {}, message = "" } = res?.data;

            // making data from response
            const body = {
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                phone: data.phone,
                profession: data.profession,
                city: data.city,
                country: data.country,
                postCode: data.post_code,
                aboutSelf: data.about,
                profileImage: data.image,
                address: data.address,
            };

            const socialLinkList = [];

            if (Object.keys(data?.social_links)?.length) {
                const socialItems = data.social_links;

                for (const item in socialItems) {
                    socialLinkList.push({
                        websiteName: item,
                        socialLink: socialItems[item],
                        id: Math.floor(Math.random() * 8765465465),
                    });
                }
            }

            body.socialLinkList = socialLinkList;
            dispatch(storePersonalInfo({ data: body, activeIndex: 0, cvTemplateId: template_id }));

            // toast.success(message || "Personal information updated successfully");
        }
    } catch (errors) {
        // toast.error(errors.response.data.message || "Something went wrong. please try again later");

        if (process.env.NODE_ENV === "development") {
            console.log(errors, "from error message");
        }
    }
};

export default React.memo(PersonalInfo);
