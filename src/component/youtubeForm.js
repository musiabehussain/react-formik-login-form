import React from "react";
import * as Yup from "yup";
import "../../src/App";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumbers: ["", ""],
  phNumbers: [],
};
const onSubmit = (value) => {
  console.log("formdata", value);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required   name field"),
  email: Yup.string()
    .email("Invalid email format")
    .required("required  user email"),
  channel: Yup.string().required("Required channel name"),
});

const Oldyoutubeform = () => {
  // console.log("viseted fields", formik.touched);
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component={TextError} />
          </div>

          <div className="form-control">
            <label htmlFor="email">email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component={TextError} />
          </div>
          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <Field type="text" id="channel" name="channel" />
            <ErrorMessage name="channel" component={TextError} />
          </div>
          <div className="form-control">
            <label htmlFor="comments">comments</label>
            <Field as="textarea" id="comments" name="comments" />
          </div>
          <div className="form-control">
            <label htmlFor="address">address</label>
            <Field type="text" name="address" />
            {(props) => {
              console.log("render props", props);
              const { Field, Form, meta } = props;
              return (
                <div>
                  <input id="address" {...Field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </div>

          <div className="form-control">
            <label htmlFor="facebook"> facebook profile</label>
            <Field type="text" id="facebook" name="social.facebook" />
          </div>

          <div className="form-control">
            <label htmlFor="twitter"> twitter profile</label>
            <Field type="text" id="twitter" name="social.twitter" />
          </div>

          <div className="form-control">
            <label htmlFor="primeryPhone"> Primery Phone Number</label>
            <Field type="text" id="primeryPhone" name="phoneNumbers[0]" />
          </div>
          <div className="form-control">
            <label htmlFor="secondryphone"> Secondry Phone Number</label>
            <Field type="text" id="secondryphone" name="phoneNumbers[1]" />
          </div>

          <div className="form-control">
            <label htmlFor="secondryphone"> List of phone Numbers</label>
            <FieldArray name="phNumbers">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { phNumbers } = values;
                return (
                  <div>
                    {phNumbers.map((phNumber, index) => (
                      <div key={index}>
                        <Field type="text" name={`phNumbers[${index}]`} />
                        {index > 0 && (
                          <button type="button" onClick={() => remove(index)}>
                            -
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={() => push("")}>
                      +
                    </button>
                  </div>
                );
              }}
            </FieldArray>
          </div>

          <button type="submit"> submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default Oldyoutubeform;
