import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import UploadModal from './UploadModal';
import TextField from '@mui/material/TextField';
import { askQuestion } from '../apis/apis';

import './styles.css';

const ChatBox = ({ projectName }) => {
    const [showModal, setShowModal] = useState(false);
    const [messagePairs, setMessagePairs] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Reset messagePairs when projectName changes
        setMessagePairs([]);
    }, [location.pathname]);

    const handleMessageChange = (e) => {
        setInputMessage(e.target.value);
    };

    const handleSendMessage = () => {
        const newMessage = {
            user: inputMessage,
            bot: '', // Initialize bot response to empty string
        };

        setMessagePairs([...messagePairs, newMessage]); // Add the user message to the messagePairs array

        askQuestion(inputMessage, projectName).then((response) => {
            if (response.status !== 200) {
                setOpenSnackbar(true);
                return;
            }
            // Update the bot response for the last message pair
            setMessagePairs((prevPairs) => {
                const updatedPairs = [...prevPairs];
                updatedPairs[updatedPairs.length - 1].bot = response.data.response;
                return updatedPairs;
            });
        });
        setInputMessage(''); // Clear input message after sending
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    if (!projectName) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    width: '72vw',
                    color: '#808080',
                }}
            >
                <Typography variant="h4">Please Select a project to chat</Typography>
            </div>
        );
    }

    return (
        <div style={{ width: '75vw', height: '95vh' }}>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => {
                    setOpenSnackbar(false);
                }}
                message="'Error asking question to the bot"
            />
            <UploadModal
                currentProjectName={projectName}
                setShowModal={setShowModal}
                showModal={showModal}
            />
            <Box
                justifyContent="space-between"
                sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    flexDirection: 'column',
                    alignItems: 'space-between',
                    padding: '3vh 1vw 0 1vw',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" fontWeight={900} ml={2} color="white">
                        {projectName}
                    </Typography>
                    <Button
                        sx={{ height: '35px', width: '200px' }}
                        fullWidth
                        className="button"
                        variant="contained"
                        onClick={() => setShowModal(true)}
                    >
                        Upload Files
                    </Button>
                </Box>
                <Box flex={1} overflow="auto" margin="12px 0">
                    {messagePairs?.map((pair, index) => (
                        <React.Fragment key={index}>
                            <Typography
                                variant="body1"
                                textAlign="right"
                                style={{
                                    marginBottom: '5px',
                                    marginRight: '10px',
                                }}
                            >
                                <span
                                    style={{
                                        display: 'inline-block',
                                        padding: '10px 20px',
                                        borderRadius: '20px',
                                        textAlign: 'left',
                                        maxWidth: '50%',
                                        wordWrap: 'break-word',
                                        color: 'white',
                                    }}
                                >
                                    {pair.user}
                                </span>
                            </Typography>
                            <Typography
                                variant="body1"
                                style={{ marginBottom: '5px', marginLeft: '10px' }}
                                textAlign="left"
                            >
                                <span
                                    style={{
                                        display: 'inline-block',
                                        padding: '10px 20px',
                                        borderRadius: '20px',
                                        maxWidth: '50%',
                                        wordWrap: 'break-word',
                                        color: 'white',
                                    }}
                                >
                                    {pair.bot || '...'}
                                </span>
                            </Typography>
                        </React.Fragment>
                    ))}
                </Box>
                <TextField
                    sx={{ width: '75vw', maxWidth: '100%' }}
                    fullWidth
                    className="textField"
                    label="Message DocBot"
                    id="messageDocbot"
                    onChange={handleMessageChange}
                    onKeyPress={handleKeyPress}
                    value={inputMessage} // Use inputMessage for input value
                />
                <Typography
                    component="p"
                    variant="helperText"
                    textAlign="center"
                    fontSize={12}
                    mt={1}
                    color="#333333"
                >
                    DocGPT can make mistakes. Consider checking important information.
                </Typography>
            </Box>
        </div>
    );
};

export default ChatBox;
