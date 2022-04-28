import {
    StyledTextInput,
    StyledFormArea,
    StyledFormButton, 
    StyledLabel, 
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
import {formik, Form, Formik} from 'formik';
import { TextInput } from "../components/FormLib";
import * as Yup from 'yup';

//icons
import {FiMail, FiLock, FiUser, FiCalendar, FiBriefcase, FiCreditCard, FiHome, } from 'react-icons/fi';

//Loader
//import Loader, { ThreeCircles } from 'react-loader-spinner';   

//



const AcademicInformation = () => {
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}>
                    Required Academic Information!
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
                        //display requirements
                        role: "", 
                        studentID: "",
                        
                        //display roles



                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid email entered!").required("Required"),
                            password: Yup.string().min(8, "Password is too short").max(30, "Password is too long").required("Required"),
                            firstName: Yup.string().required("Required"),
                            lastName: Yup.string().required("Required"),
                            birthdate: Yup.string().required("Required"),
                            confirmEmail: Yup.string().required("Required").oneOf([Yup.ref("email")], "Email MUST match!" ),
                            confirmPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Password MUST match!" ),
                            studentID: Yup.string().required("Required"), 
                            role: Yup.string().required("Required"),


                        })
                    }

                    onSubmit={(values, {setSubmitting})=> {
                        console.log(values);
                    }}
                >           
               
                    {() => (
                        <Form>

                            <TextInput
                            name="major"
                            type="text"
                            label="Major"
                            placeholder="Software Engeenering"
                            icon = {<FiBriefcase/>}
                            />

                            <TextInput
                            name="role"
                            type="text"
                            label="Role"
                            icon = {<FiBriefcase/>}
                            />

                            <TextInput
                            name="id"
                            type="text"
                            label="Student ID"
                            placeholder="****"
                            icon = {<FiBriefcase/>}
                            />

    


                            <ButtonGroup>
                               {<StyledFormButton
                                type="submit">Financial Information</StyledFormButton>}
                        
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>

                
                <ExtraText>
                    Need Help? <TextLink to="/help">FQA Here!</TextLink>
                </ExtraText>

            </StyledFormArea>
        </div>
    );
    };
export default AcademicInformation;