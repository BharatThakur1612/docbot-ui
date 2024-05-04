import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

import { useState } from 'react';
import { uploadDoc, createProject } from '../apis/apis';

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
    const [selectedFile, setSelectedFile] = useState('');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleSubmitButtonClick = () => {
        if (selectedFile.name) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('file_name', selectedFile.name);
            formData.append('project_name', projectName);

            uploadDoc(formData)
                .then((response) => {
                    if (response.status !== 201) {
                        setMessage('Failed to upload document');
                        setOpenSnackbar(true);
                        return;
                    }
                    setMessage('Upload complete');
                    setOpenSnackbar(true);
                })
                .catch((err) => {
                    console.log(err);
                    setMessage('Error while uploading');
                    setOpenSnackbar(true);
                });
            setSelectedFile('');
        }
        if (!currentProjectName) {
            const new_project_data = { project_name: projectName };
            createProject(new_project_data)
                .then((response) => {
                    if (response.status !== 201) {
                        setMessage('Failed to create project');
                        setOpenSnackbar(true);
                        return;
                    }
                    setOpenSnackbar(true);
                })
                .catch((err) => console.log(err));
        }
        setShowModal(false);
    };

    return (
        <>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => {
                    setOpenSnackbar(false);
                }}
                message={message}
            />
            <Modal
                open={showModal}
                onClose={() => {
                    setSelectedFile('');
                    setShowModal(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        variant="h5"
                        fullWidth
                        sx={{
                            textAlign: 'center',
                            mb: '0.5rem',
                        }}
                    >
                        {currentProjectName ? 'Upload File' : 'Enter Project Details'}
                    </Typography>

                    <TextField
                        fullWidth
                        onChange={(e) => setProjectName(e.target.value)}
                        disabled={Boolean(currentProjectName)}
                        placeholder="Enter Project Name"
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
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            document.getElementById('fileInput').click();
                        }}
                    >
                        {selectedFile ? (
                            <Typography>{selectedFile.name}</Typography>
                        ) : (
                            <Typography>Upload File/Drag or drop files</Typography>
                        )}
                        <input
                            id="fileInput"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </div>
                    <Button variant="contained" onClick={handleSubmitButtonClick} sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default UploadModal;
