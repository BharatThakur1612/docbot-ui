import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import UploadModal from './UploadModal';
import TextField from '@mui/material/TextField';
import { askQuestion } from '../apis/apis';

const ChatBox = ({ projectName }) => {
    const [showModal, setShowModal] = useState(false);
    const [messagePairs, setMessagePairs] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
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

        askQuestion(inputMessage, projectName)
            .then((response) => {
                if (response.status !== 200) {
                    alert("Error asking question to the bot")
                    return
                }
                // Update the bot response for the last message pair
                setMessagePairs(prevPairs => {
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '72vw', color: '#808080' }}>
                <Typography variant='h4'>Please Select a project to chat</Typography>
            </div>
        );
    }

    return (
        <div style={{width: "75vw", height: "95vh"}}>
            <UploadModal currentProjectName={projectName} setShowModal={setShowModal}  showModal={showModal} />
            <Box justifyContent='space-between' sx={{ display: 'flex', width: "100%", height: "100%" ,flexDirection: 'column',alignItems: 'space-between', padding: '3vh 1vw 0 1vw' }}>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
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
                <Box>
                    {messagePairs.map((pair, index) => (
                        <React.Fragment key={index}>
                            <Typography variant='body1' style={{marginBottom: '5px', marginRight: '10px', textAlign: 'right'}}>{pair.user}</Typography>
                            <Typography variant='body2' style={{marginBottom: '5px', marginLeft: '10px'}}>{pair.bot}</Typography>
                        </React.Fragment>
                    ))}
                </Box>
                <TextField
                    sx={{width: "75vw", maxWidth: '100%',}}
                    fullWidth
                    label="Message DocBot"
                    id="messageDocbot"
                    onChange={handleMessageChange}
                    onKeyPress={handleKeyPress}
                    value={inputMessage} // Use inputMessage for input value
                />
            </Box>
        </div>
    );
};

export default ChatBox;
