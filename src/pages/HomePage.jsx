import { Box } from "@mui/material";
import SideBar from "../components/SideBar";
import ChatBox from "../components/ChatBox";
import { useParams } from 'react-router-dom';


const HomePage = () => {
    const { projectName } = useParams();
    return (
        <Box sx={{ display: 'flex' }}>
            <SideBar />
            <ChatBox projectName={projectName} />
        </Box>
    )
};

export default HomePage;
