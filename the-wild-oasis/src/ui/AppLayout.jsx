import {Outlet} from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import styled from "styled-components";

const StyledAppLayout = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;

    grid-template-areas:
    "sidebar header"
    "sidebar main";
`;



const Main = styled.main`
    grid-area: main;
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    height: 100%;
    width: 100%;
`;



function AppLayout(){
    return (<StyledAppLayout>

        <Header/>
        <Sidebar/>
        <Main>
            <Outlet/>
        </Main>


    </StyledAppLayout>)
}

  export default AppLayout;