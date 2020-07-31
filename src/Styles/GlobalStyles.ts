import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
    }
    body {
        background-color:#F8F9FC;
        color:${(props) => props.theme.blackColor};
        font-size:14px;
        width:100%;
    }
    a {
        color:inherit;
        text-decoration:none;
    }
    li{
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }
    button:hover{
        cursor: pointer;
    }
    button:focus{
        outline:none;
    }
    button{
        border:none;
    }
`;
