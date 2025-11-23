import {Outlet} from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import styled from "styled-components";

const StyledAppLayout = styled.div`
    display: grid;
    height: 100vh;
    width: 100vw;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
        "sidebar header"
        "sidebar main";
    overflow: hidden;
`;
const Container = styled.div`
max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;





const Main = styled.main`
    grid-area: main;
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow-y: auto;
    overflow-x: hidden;
`;

function AppLayout(){
    return (
        <StyledAppLayout>
            <Header/>
            <Sidebar/>
            <Main>
                <Outlet/>
            </Main>
        </StyledAppLayout>
    )
}

export default AppLayout;