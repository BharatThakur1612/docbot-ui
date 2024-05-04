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
                if (response.status !== 200) {
                    setProjects([]);
                }
                setProjects(response.data);
            })
            .catch(() => setProjects([]));
    }, [showModal]);

    return (
        <div style={{ height: '100vh', width: '22vw', backgroundColor: '#333333' }}>
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
                        variant="body2"
                        sx={{
                            padding: '0 1rem',
                            marginTop: '1rem',
                            cursor: 'pointer',
                            color: '#ffffff',
                            margin: '0 !important',
                            padding: '10px 20px',
                            background: '#5c5a59',
                            margin: '12px !important',
                            borderRadius: '10px',
                            background:
                                'linear-gradient(90deg, rgba(24, 24, 24, 1) 0%, rgba(49, 54, 54, 1) 95%, rgba(58, 65, 65, 1) 120%)',
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
