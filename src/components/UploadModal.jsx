import { Box, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35vw',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
};

const UploadModal = ({ showModal, setShowModal, currentProjectName }) => {
    const [projectName, setProjectName] = useState(currentProjectName || '');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    return (
        <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    variant='h5'
                    fullWidth
                    sx={{
                        textAlign: 'center',
                        mb: '0.5rem'
                    }}
                >
                    {currentProjectName ? 'Upload File' : 'Enter Project Details'}
                </Typography>

                <TextField
                    fullWidth
                    onChange={(e) => setProjectName(e.target.value)}
                    disabled={Boolean(currentProjectName)}
                    placeholder='Enter Project Name'
                    label={currentProjectName || 'Project Name'}
                />

                <div
                    style={{
                        marginTop: '1rem',
                        borderRadius: '0.2rem',
                        width: '34.8vw',
                        height: '30vh',
                        border: '1px dashed black',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer'
                    }}
                    onClick={() => fileInput.click()}
                >
                    <Typography>Upload File/Drag or drop files</Typography>
                </div>
            </Box>
        </Modal>
    );
};

export default UploadModal;
