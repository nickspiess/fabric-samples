import {StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup} from "./../components/Styles";

import React, { Component }  from 'react';

//Logo
import Logo from "./../assets/logo.PNG";

const Start = () => {
    return (
        <div>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "transparent",
                    width: "100%",
                    padding: "15px",
                    display: "flex",
                    justifyContent: "flex-start",
                }}
            >
                <Avatar image={Logo} />
            </div>
        <StyledTitle size={65}>
            Welcome to SEAM!
            </StyledTitle>
            <StyledSubTitle size = {30}>
                We are happy you are here!
            </StyledSubTitle>
        <ButtonGroup>                          
            <StyledButton to="/login">
                Login
            </StyledButton>
            <StyledButton to="/signup">
                Signup
            </StyledButton>
        </ButtonGroup>  
        </div>
    );
}

export default Start;