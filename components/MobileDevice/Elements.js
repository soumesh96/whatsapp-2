import styled from "@emotion/styled";

export const MainContainer = styled('div')`
    height: 100vh;
    width: 100%;
    background: black;
    padding: 0 20px;
    text-align: center;
    & div:first-of-type {
        padding: 36% 0 12%;
    }
    > p {
        font-size: 16px;
        font-weight: 500;
        color: #CCCCCC;
    }
`;

export const FooterWrapper = styled('div')`
    position: fixed;
    bottom: 12px;
    left: 12px;
    display: flex;
    align-items: center;
    > button {
    margin-left: 30px;
    }
    > p {
        font-size: 14px;
        font-weight: 500;
        color: #CCCCCC;
    }
    > button {
        color: rgb(17, 82, 147);
    }
`;