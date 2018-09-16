import styled from 'styled-components'
import oc from 'open-color'
import { media } from 'lib/style-utils'

const WhiteBox = styled.div `
    width: 700px;
    margin: 0 auto;
    padding: 1rem;

    background: white;
    color: ${oc.gray[6]};
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    cursor: text;

    &:hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }

    ${media.desktop`
        width: 500px;
    `}

    ${media.tablet`
        width: 100%;
    `}
`


export default WhiteBox
