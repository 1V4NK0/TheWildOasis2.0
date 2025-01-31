import styled from "styled-components"


//grid row takes all space from top to the bottom
//so it takes all height of the grid vertically
const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    grid-row: 1 / -1;
    border-right: 1px solid var(--color-grey-100);
`

function Sidebar() {
    return (
        <StyledSidebar>
            SIDEBAR
        </StyledSidebar>
    )
}

export default Sidebar
