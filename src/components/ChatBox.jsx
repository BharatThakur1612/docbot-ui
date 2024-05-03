import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { getProjects } from '../apis/apis';
import UploadModal from './UploadModal';

const ChatBox = ({ projectName }) => {
    const [showModal, setShowModal] = useState(false);
    const location = useLocation();

    useEffect(() => {
    }, [location.pathname]);

    if (!projectName) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '72vw', color: '#808080' }}>
                <Typography variant='h4'>Please Select a project to chat</Typography>
            </div>
        );
    }

    return (
        <div style={{ display: 'block' }}>
            <UploadModal currentProjectName={projectName} setShowModal={setShowModal}  showModal={showModal} />
            <Box justifyContent='space-between' sx={{ display: 'flex', height: '97vh', width: '80vw', padding: '3vh 1vw 0 1vw' }}>
                <Typography variant='h5'>{projectName}</Typography>
                <Button
                    sx={{ height: '35px', width: '200px' }}
                    fullWidth
                    variant="contained"
                    onClick={() => setShowModal(true)}
                >
                    Upload Files
                </Button>
            </Box>
        </div>
    );
};

export default ChatBox;
