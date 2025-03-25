import styled, {css} from "styled-components";
/*eslint-disable no-constant-condition */

const test = `text-align: center;`;


const Heading = styled.h1`
${props => props.as ==='h1' && 
css`
    font-size: 3rem;
    font-weight: 600;
`}

line-height: 1.4;
${props => props.as === 'h2' &&
css`
    font-size: 3rem;
    text-align: center;
    font-weight: 600;
`}

${props => props.as === 'h3' &&
css`
    font-size: 2rem;
    font-weight: 500;
`}
  /* font-size: ${10 > 5 ? '30px' : '5px'};
  font-weight: 600;
  background-color: yellow;
  ${test} */
`;

export default Heading;