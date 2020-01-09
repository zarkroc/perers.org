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
            <h2>Add skill</h2>
            <Form>
                <label htmlFor="name">Namn:<br />

                    <Field id="name" type="text" name="name"
                        className={errors.name && touched.name ? ' is-invalid' : ''}
                        value={values.name} />
                    <ErrorMessage component="span" className="error" name="name" />
                </label><br />
                <label htmlFor="level">level:<br />

                    <Field id="level" type="text" name="level"
                        className={errors.level && touched.level ? ' is-invalid' : ''}
                        value={values.level} />
                    <ErrorMessage component="span" className="error" name="level" />
                </label><br />
                <button className="btnPrimary">spara</button>
            </Form>
            {errors.apifault ? <p>{errors.apifault}</p> : null }
        </section>
    )


const AddSkill = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ name, level }) {
        return {
            name: name || "",
            level: level || ""
        };
    },

    validationSchema: yup.object().shape({
        name: yup.string().required("Namn är obligatoriskt"),
        level: yup.string().required("Nivå är obligatoriskt"),
    }),


    handleSubmit: (values, { setSubmitting, resetForm, setStatus, setErrors, props }) => {
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
            var data = {
                name: values.name,
                level: values.level
            };
            var apiURL = "";

            if (process.env.NODE_ENV === "production") {
                apiURL = "https://api.perers.org/competence"
            } else {
                apiURL = "http://localhost:1337/competence"
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
                    }
                });
        }, 1000);
    }
})(MyFormik);

export default AddSkill;

