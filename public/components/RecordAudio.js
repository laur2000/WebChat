import React, { useEffect, useRef, useState } from "react";

import { Col, Popover, Row } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { formatTime } from "../utils";

export const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const AudioRef = useRef();

  const handleSubmitRecording = async () => {
    setIsRecording(false);

    const audioUrl = await AudioRef.current();
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const handleCancelRecording = async () => {
    setIsRecording(false);

    await AudioRef.current();
    AudioRef.current = null;
  };

  const handleStartRecording = async () => {
    if (!isRecording) {
      setIsRecording(true);
      AudioRef.current = await CaptureAudio();
    }
  };

  return (
    <RecordingPopover
      visible={isRecording}
      onCancel={handleCancelRecording}
      onSubmit={handleSubmitRecording}
    >
      <button onClick={handleStartRecording} className="btn ml-1">
        <i className="fas fa-microphone"></i>
      </button>
    </RecordingPopover>
  );
};

export const RecordingPopover = ({ visible, onCancel, onSubmit, children }) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimer(0);
    const timerInterval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(timerInterval);
  }, [visible, setTimer]);

  return (
    <Popover
      visible={visible}
      trigger="click"
      content={
        <Row gutter={[15, 15]}>
          <Col>
            <CloseCircleOutlined onClick={onCancel} />
          </Col>
          <Col>{formatTime(timer)}</Col>
          <Col>
            <CheckCircleOutlined onClick={onSubmit} />
          </Col>
        </Row>
      }
    >
      {children}
    </Popover>
  );
};

export const CaptureAudio = async () => {
  const audioStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  const mediaRecorder = new MediaRecorder(audioStream);
  mediaRecorder.start();

  const audioChunks = [];

  mediaRecorder.addEventListener("dataavailable", (e) =>
    audioChunks.push(e.data)
  );

  return () =>
    new Promise((resolve) => {
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        resolve(audioUrl);
      });
      mediaRecorder.stop();
    });
};
