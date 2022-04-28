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
import {FiMail, FiLock} from 'react-icons/fi';

//Loader
//import Loader, { ThreeCircles } from 'react-loader-spinner'; 


const ForgotPassword = () => {
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}>
                    Password Reset
                </StyledTitle>
                <Formik

                    initialValues={{
                        email: "",
                        redirect: "http://localhost:3000/passwordreset"

                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid email entered!").required("Required"),
                        })
                    }

                    onSubmit={(values, {setSubmitting})=> {
                        console.log(values);
                    }}
                >           
               
                    {() => (
                        <Form>
                            <TextInput 
                            name="email"
                            type="text"
                            label="Confirm Your Email Address"
                            placeholder="me@example.com"
                            icon = {<FiMail/>}
                            />



                            <ButtonGroup>
                               {<StyledFormButton
                                type="submit">Submit</StyledFormButton>}
                        
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
export default ForgotPassword;