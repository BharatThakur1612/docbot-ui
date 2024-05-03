import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { getProjects } from '../apis/apis';
import UploadModal from './UploadModal';

const SideBar = () => {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProjects()
            .then((response) => {
                if(response.status !== 200) {
                    setProjects([])
                }
                setProjects(response.data)
            })
            .catch(() => setProjects([]));
    }, [showModal]);

    return (
        <div style={{ height: '100vh', width: '20vw', backgroundColor: '#0ff' }}>
            <UploadModal setShowModal={setShowModal} showModal={showModal} />
            <Box>
                <div style={{ width: '90%', margin: 'auto' }}>
                    <Button
                        sx={{ margin: '1rem 0' }}
                        fullWidth
                        variant="contained"
                        onClick={() => setShowModal(true)}
                    >
                        Create Project
                    </Button>
                </div>
                {projects.map((project) => (
                    <Typography
                        onClick={() => navigate(`/${project.project_name}`)}
                        variant="h5"
                        sx={{
                            padding: '0 1rem',
                            marginTop: '0.5rem',
                            borderBottom: '1px solid black',
                            cursor: 'pointer',
                        }}
                    >
                        {project.project_name}
                    </Typography>
                ))}
            </Box>
        </div>
    );
};

export default SideBar;
