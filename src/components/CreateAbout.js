import React from 'react';
import {
    withFormik,
    Form,
    Field,
    ErrorMessage
} from 'formik';
import * as yup from 'yup';

const apiKey = process.env.REACT_APP_API_KEY;


const MyFormik = ({
    values,
    errors,
    touched,
}) => (
        <section>
            <h2>Skapa presentation</h2>
            <Form>
                <label htmlFor="name">Namn:<br />

                    <Field id="name" type="text" name="name"
                        className={errors.name && touched.name ? ' is-invalid' : ''}
                        value={values.name} />
                    <ErrorMessage component="span" className="error" name="name" />
                </label><br />
                <label htmlFor="desc">Description:<br />

                    <Field id="desc" type="text" name="desc"
                        className={errors.desc && touched.desc ? ' is-invalid' : ''}
                        value={values.desc} />
                    <ErrorMessage component="span" className="error" name="desc" />
                </label><br />
                <label htmlFor="homeTown">homeTown:<br />

                    <Field id="homeTown" type="text" name="homeTown"
                        className={errors.homeTown && touched.homeTown ? ' is-invalid' : ''}
                        value={values.homeTown} />
                    <ErrorMessage component="span" className="error" name="homeTown" />
                </label><br />
                <label htmlFor="interest">interest:<br />

                    <Field id="interest" type="text" name="interest"
                        className={errors.interest && touched.interest ? ' is-invalid' : ''}
                        value={values.interest} />
                    <ErrorMessage component="span" className="error" name="interest" />
                </label><br />
                <button className="btnPrimary">spara</button>
            </Form>
            {errors.apifault ? <p>{errors.apifault}</p> : null }
        </section>
    )


const CreateAbout = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ name, homeTown, desc, interest }) {
        return {
            name: name || "",
            desc: desc || "",
            homeTown: homeTown || "",
            interest: interest || ""
        };
    },

    validationSchema: yup.object().shape({
        name: yup.string().required("Antal är obligatoriskt"),
        desc: yup.string().required("Antal är obligatoriskt"),
        homeTown: yup.string().required("Antal är obligatoriskt"),
        interest: yup.string().required("Antal är obligatoriskt"),
    }),


    handleSubmit: (values, { setSubmitting, resetForm, setStatus, setErrors, props }) => {
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
            var data = {
                name: values.name,
                desc: values.desc,
                homeTown: values.homeTown,
                interest: values.interest
            };
            var apiURL = "";

            if (process.env.NODE_ENV === "production") {
                apiURL = "https://api.perers.org/"
            } else {
                apiURL = "http://localhost:1337"
            }
            fetch(apiURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api_key': apiKey,
                    'x-access-token': sessionStorage.getItem("token")
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(function (res) {
                    if(res.errors) {
                        setErrors({
                            apifault: "Could not save reason: " + res.errors.detail
                        })
                    } else {
                        resetForm();
                        setSubmitting(false);
                        props.callBack();
                    }
                });
        }, 1000);
    }
})(MyFormik);

export default CreateAbout;

