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
                <label htmlFor="company">Namn:<br />
                    <Field id="company" type="text" name="company"
                        className={errors.company && touched.company ? ' is-invalid' : ''}
                        value={values.company} />
                    <ErrorMessage component="span" className="error" name="company" />
                </label><br />
                <label htmlFor="desc">desc:<br />
                    <Field id="desc" type="text" name="desc"
                        className={errors.desc && touched.desc ? ' is-invalid' : ''}
                        value={values.desc} />
                    <ErrorMessage component="span" className="error" name="desc" />
                </label><br />
                <label htmlFor="start">start:<br />
                    <Field id="start" type="text" name="start"
                        className={errors.start && touched.start ? ' is-invalid' : ''}
                        value={values.start} />
                    <ErrorMessage component="span" className="error" name="start" />
                </label><br />
                <label htmlFor="stop">stop:<br />
                    <Field id="stop" type="text" name="stop"
                        className={errors.stop && touched.stop ? ' is-invalid' : ''}
                        value={values.stop} />
                    <ErrorMessage component="span" className="error" name="stop" />
                </label><br />
                <label htmlFor="role">role:<br />
                    <Field id="role" type="text" name="role"
                        className={errors.role && touched.role ? ' is-invalid' : ''}
                        value={values.role} />
                    <ErrorMessage component="span" className="error" name="role" />
                </label><br />
                <button className="btnPrimary">spara</button>
            </Form>
            {errors.apifault ? <p>{errors.apifault}</p> : null}
        </section>
    )


const AddWorkHistory = withFormik({
    enableReinitialize: true,
    mapPropsToValues({ company, desc, role, start, stop }) {
        return {
            company: company || "",
            desc: desc || "",
            role: role || "",
            start: start || "",
            stop: stop || ""
        };
    },

    validationSchema: yup.object().shape({
        company: yup.string().required("Antal är obligatoriskt"),
        role: yup.string().required("Roll är obligatoriskt"),
        desc: yup.string().required("Beskrivning är obligatoriskt"),
        start: yup.string().required("Start är obligatoriskt"),
        stop: yup.string().required("Stop är obligatoriskt"),
    }),


    handleSubmit: (values, { setSubmitting, resetForm, setStatus, setErrors, props }) => {
        setTimeout(() => {
            resetForm();
            setSubmitting(false);
            var data = {
                company: values.company,
                desc: values.desc,
                start: values.start,
                stop: values.stop,
                role: values.role
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
                            apifault: "Could not save +" + res.errors.details
                        })
                    }
                });
        }, 1000);
    }
})(MyFormik);

export default AddWorkHistory;

