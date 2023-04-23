import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function Dashboard() {
    const [file, setFile] = useState(null);
    const router = useRouter();
    const changeHandler = (e) => {
        console.log("Change Handler Called");
        const my_file = e.target.files[0];
        setFile(URL.createObjectURL(my_file)); // updates on next render
    }
    const transcribeHandler = (e) => {
        console.log("Called Transcribe Handler");
        e.preventDefault();
        if (file != null) {
            const formData = new FormData();
            formData.append('file', file);
            router.push({
                pathname: 'transcribe',
                query: { file: file },
            });
        }
    }
    return (
      <div>
        <h1>Transcribe Audio</h1>
        <input type="file" onChange={changeHandler}/>
        <button onClick={transcribeHandler}>
            Transcribe
        </button>
      </div>
    );
  };