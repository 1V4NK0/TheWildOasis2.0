import styled from "styled-components"
import Logo from "./Logo"
import MainNav from './MainNav'

//grid row takes all space from top to the bottom
//so it takes all height of the grid vertically
const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    grid-row: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    border-right: 1px solid var(--color-grey-100);
`

function Sidebar() {
    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
        </StyledSidebar>
    )
}

export default Sidebar
