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


const FinancialInformation = () => {
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}>
                    Required Financial Information!
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
                            name="bankName"
                            type="text"
                            label="Name of Bank"
                            placeholder="Credit Union"
                            icon = {<FiCreditCard/>}
                            />

                            <TextInput 
                            name="cardType"
                            type="text"
                            label="Type of Card"
                            placeholder="Type"
                            icon = {<FiCreditCard/>}
                            />

                            <TextInput 
                            name="cardNumber"
                            type="text"
                            label="Card Number"
                            icon = {<FiCreditCard/>}
                            />

                            <TextInput 
                            name="csvCode"
                            type="text"
                            label="CSV"
                            placeholder="***"
                            icon = {<FiCreditCard/>}
                            />

                            <ButtonGroup>
                               {<StyledFormButton
                                type="submit">Finish Setup!</StyledFormButton>}
                        
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>

               
               
                <ExtraText>
                    Need Help? <TextLink to="/help">FAQ Here!</TextLink>
                </ExtraText>

            </StyledFormArea>
        </div>
    );
    };
export default FinancialInformation;