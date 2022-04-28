import {
    StyledTextInput,
    StyledFormArea,
    StyledFormButton,
    StyledLabel,
    StyledLabelOne,
    Avatar,
    StyledTitle,
    colors,
    ButtonGroup,
    TextLink,
    ExtraText
} from "./../components/Styles";

import Logo from './../assets/nick project.png';
import React, { Component }  from 'react';

//formik
import { formik, Form, Formik } from 'formik';
import { TextInput } from "../components/FormLib";
import * as Yup from 'yup';

//icons
import { FiMail, FiLock, FiUser, FiCalendar, FiBriefcase, FiCreditCard } from 'react-icons/fi';

//Loader
//import Loader, { ThreeCircles } from 'react-loader-spinner'; 


const Signup = () => {
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}>
                    User Signup
                </StyledTitle>
                <Formik

                    initialValues={{
                        firstName: "",
                        lastName: "",
                        birthdate: "",
                        email: "",
                        confirmEmail: "",
                        password: "",
                        confirmPassword: "",
                        role: "",
                        studentID: "",




                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid Email! Check Format Above.").required("Required"),
                            password: Yup.string().min(10, "Invalid Password! Check Requirements.").required("Required"),
                            firstName: Yup.string().required("Required"),
                            lastName: Yup.string().required("Required"),
                            birthdate: Yup.string().required("Required"),
                            confirmEmail: Yup.string().required("Required").oneOf([Yup.ref("email")], "Doesn't match!").required("Required"),
                            confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Doesn't match!").required("Required"),

                        })
                    }

                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                    }}
                >

                    {() => (
                        <Form>
                            <TextInput
                                name="firstName"
                                type="text"
                                label="First Name"
                                placeholder="Dave"
                                icon={<FiUser />}
                            />

                            <TextInput
                                name="lastName"
                                type="text"
                                label="Last Name"
                                placeholder="Rushit"
                                icon={<FiUser />}
                            />

                            <TextInput

                                name="birthdate"
                                type="date"
                                label="Day of Birth"
                                //"Required Format: MM/DD/YYYY"
                                icon={<FiCalendar />}
                            />

                            <TextInput
                                name="email"
                                type="text"
                                label="Email Address"
                                //Required Format: me@example.com
                                placeholder="me@example.com"
                                icon={<FiMail />}
                            />

                            <TextInput
                                name="repeatEmail"
                                type="text"
                                label="Confirm Email Address" //  Required Format: me@example.com
                                placeholder="me@example.com"
                                icon={<FiMail />}
                            />



                            <TextInput
                                name="password"
                                type="text"
                                label="Password" // Requirements: Exactly 10 characters, 1 Capital letter, 1 Symbol
                                placeholder="****"
                                icon={<FiLock />}
                            />



                            <TextInput
                                name="repeatPassword"
                                type="text"
                                label="Confirm Password" //                             Requirements: Exactly 10 characters, 1 Capital letter, 1 Symbol

                                placeholder="****"
                                icon={<FiLock />}
                            />




                            <ButtonGroup>
                                {<StyledFormButton
                                    type="submit">Contact Information</StyledFormButton>}

                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>

                <ExtraText>
                    Already A User? <TextLink to="/login">Login!</TextLink>
                </ExtraText>

                <ExtraText>
                    Need Help? <TextLink to="/help">FAQ Here!</TextLink>
                </ExtraText>

            </StyledFormArea>
        </div>
    );
};
export default Signup;