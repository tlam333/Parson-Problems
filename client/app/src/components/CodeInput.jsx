import { useState } from 'react';
import axios from 'axios';

function CodeInput({ answerLines, elapsedTime, setElapsedTime, timerInterval, problemId }) {
    const [inputValue, setInputValue] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Function to handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Function to handle key press (Enter key)
    const handleKeyDown = async (event) => {
        if (event.key === 'Enter' && inputValue === "python drop.py") {
            handleSubmit();
        }
    };


    // Simulate a request to validate the command
    const handleSubmit = async () => {
        const submitUrl = `http://localhost:3001/api/parsonProblem/submit/${problemId}`;

        try {
            const res = await axios.post(submitUrl, {
                codeBlocks: answerLines,
                elapsedTime: elapsedTime
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            const data = res.data;

            if (data.passed === true) {
                setIsCorrect(true);
                setErrorMessage('');
            } else {
                setIsCorrect(false);
                setErrorMessage(data.terminalMessage || 'Incorrect python code, please try again');
            }
        } catch (error) {
            console.error('Error during submission:', error);
        } finally {
            clearInterval(timerInterval);
            setElapsedTime(0);
        }
    };

    return (
        <div className="mockup-code flex flex-col h-1/4 w-full overflow-y-scroll">
            <pre data-prefix="$" className="flex items-center">
                <code>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent outline-none inline"
                        placeholder="Type command..."
                    />
                </code>
            </pre>
            {isCorrect && (
                <pre data-prefix="$" className="flex items-center text-success">
                    <code>Test Cases Passed!</code>
                </pre>
            )}
            {!isCorrect && errorMessage && (
                <pre data-prefix="$" className="flex items-center text-warning">
                    <code>{errorMessage}</code>
                </pre>
            )}
        </div>
    );
}

export default CodeInput;
