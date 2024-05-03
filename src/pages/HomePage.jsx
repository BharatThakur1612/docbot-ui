import { Box } from "@mui/material";
import SideBar from "../components/SideBar";
import ChatBox from "../components/ChatBox";

const HomePage = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <ChatBox />
        </Box>
    )
};

export default HomePage;
