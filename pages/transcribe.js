import { useRouter } from 'next/router';


export default function TranscribePage(props) {
  return (
    <div>
      <h1>{props.message}</h1>
      <h2> URL: {props.fileURL} </h2>
      <a href={props.fileURL} download>
        Download File
      </a>
      <h1>Transcribed Text</h1>
      <h2>
        {props.transcript}
      </h2>
    </div>
  );
};


// Call the Google Cloud API
export async function getServerSideProps(context) {
  const fs = require('fs');
  const speech = require('@google-cloud/speech');
  const client = new speech.SpeechClient();
  console.log("In here!")

  const transcribeAudio = async (audioFileURI) => {
    const request = {
      audio: {
        content: fs.readFileSync(audioFileURI).toString('base64'),
      },
      config: {
        encoding: 'MP3',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
      }
    };
    console.log("Awaiting response")
    const [response] = await client.recognize(request);
    console.log("Response Received")
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(transcription)
    return transcription;
  };
  let transcript;
  try {
    transcript = await transcribeAudio("C:/Users/ryanp/Downloads/harvard.mp3");
  } catch (error) {
    console.error(error);
  }
  console.log(transcript.toString());
  return {
    props: { 
      message: "Transcribe me!",
      fileURL: context.query.file,
      transcript: transcript,
    },
  }
}
