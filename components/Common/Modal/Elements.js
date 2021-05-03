import styled from '@emotion/styled';
import Modal from "@material-ui/core/Modal";


export const ModalContainer = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ModalContent = styled('div')`
    background: white;
    border: 2px solid #000;
    box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12) ;
    padding: 16px 32px 24px;
    // min-height: 450px;
`;