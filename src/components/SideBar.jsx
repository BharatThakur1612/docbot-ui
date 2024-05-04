import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { getProjects } from '../apis/apis';
import UploadModal from './UploadModal';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import './styles.css';

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
            <UploadModal setShowModal={setShowModal} showModal={showModal} setProjects={setProjects} />
            <Box>
                <div style={{ width: '90%', margin: 'auto' }}>
                    <Button
                        sx={{ margin: '1rem 0' }}
                        fullWidth
                        className="button"
                        variant="contained"
                        onClick={() => setShowModal(true)}
                    >
                        Create Project
                    </Button>
                </div>
                {(
                    projects || [
                        {
                            project_name: 'Hello World',
                        },
                    ]
                )?.map((project) => (
                    <Typography
                        onClick={() => navigate(`/${project.project_name}`)}
                        variant="body2"
                        className='typo'
                        sx={{
                            marginTop: '1rem',
                            cursor: 'pointer',
                            color: '#ffffff',
                            padding: '10px 20px',
                            margin: '12px !important',
                            borderRadius: '10px',
                            background:
                                'linear-gradient(90deg, rgba(24, 24, 24, 1) 0%, rgba(49, 54, 54, 1) 95%, rgba(58, 65, 65, 1) 120%)',
                        }}
                    >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            {project.project_name}
                            <KeyboardArrowRightIcon class="icon" />
                        </Box>
                    </Typography>
                ))}
            </Box>
        </div>
    );
};

export default SideBar;
