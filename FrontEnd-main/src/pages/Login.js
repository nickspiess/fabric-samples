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


const Login = () => {
    return (
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}>
                    User Login
                </StyledTitle>
                <Formik

                    initialValues={{
                        email: "",
                        password: "",

                    }}
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid email entered!").required("Required"),
                            password: Yup.string().min(10, "Invalid!").required("Required"),
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
                            label="Email Address"
                            placeholder="me@example.com"
                            icon = {<FiMail/>}
                            />

                            <TextInput
                            name="password"
                            type="text"
                            label="Password"
                            placeholder="****"
                            icon = {<FiLock/>}
                            />


                            <ButtonGroup>
                               {<StyledFormButton
                                type="submit">Login</StyledFormButton>}
                                
                        
                            </ButtonGroup>
                        </Form>
                    )}
                </Formik>

                <ExtraText>
                    New User? <TextLink to="/signup">Register Here!</TextLink>
                </ExtraText>
                <ExtraText>
                    Forgot Password? <TextLink to="/forgotPassword">Reset Password!</TextLink>
                </ExtraText>
                <ExtraText>
                    Need Help? <TextLink to="/help">FAQ Here!</TextLink>
                </ExtraText>

            </StyledFormArea>
        </div>
    );
    };
export default Login;