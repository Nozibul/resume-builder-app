import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object().shape({
    firstName: yup.string()
    .required("First name is a required field")
    .matches(/^\S*$/, 'No white spaces allowed')
    .matches(/^[^\d]+$/, 'No numbers allowed')
    .min(4, 'First name at least 4 characters')
    .max(20, 'First name must be at most 20 characters'),
    lastName: yup.string()
    .required("last name is a required field")
    .matches(/^\S*$/, 'No white spaces allowed')
    .matches(/^[^\d]+$/, 'No numbers allowed')
    .min(4, 'Last name at least 4 characters')
    .max(20, 'Last name must be at most 20 characters'),
    profession: yup.string()
    .required("profession is a required field")
    .matches(/^\S*$/, 'No white spaces allowed')
    .matches(/^[^\d]+$/, 'No numbers allowed')
    .min(4, 'profession at least 4 characters')
    .max(20, 'profession must be at most 20 characters'),
    email: yup.string()
    .email()
    .required("email is a required field"),
    // .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, "Invalid email address"),
    phone: yup
      .string()
      .required("phone is a required field")
      .min(11, "phone no is not valid"),
    city: yup
      .string()
      .required("city is  a required field")
      .min(3, "The length to short")
      .max(10),
    country: yup
      .string()
      .required("country is a required field")
      .min(4, "The length to short"),
    postCode: yup
      .string()
      .required("post code is a required field")
      .min(4, "The length to short"),
    aboutSelf: yup
      .string()
      .required("please write something about your self")
      .min(4, "The length to short"),
    profileImage: yup.mixed().test("fileType", "Invalid file type", (value) => {
      if (!value) return true; // allow empty file
      if (value?.length != 1 && value[0]?.includes("data:image")) return true;
      return validFileExtensions?.includes(value[0]?.type);
    }),
    socialLinkList: yup.array().of(
      yup.object().shape({
          websiteName: yup.string().required("Name is a required").min(3, "The length to short"),
          socialLink: yup
              .string()
              .required("link is a required")
              .url("Please provide an valid url")
              .min(3, "The length to short"),
      })
    ),
  })
  .required();

const PersonalInfo = () => {
  return (
    <>
      <div>
        PersonalInfo
        <div class="grid grid-cols-3 gap-8 border p-4 justify-between">
          <div className="border col-span-2 pr-4">Cv from</div>
          <div className="border pr-8">Cv Builder</div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
