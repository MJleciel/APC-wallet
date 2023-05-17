import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Test = (props) => {
  const [data, setData] = useState('No result');
  const handleDecode = (event) => {
    console.log(event);
    setData(event.data);
    };
  return (
    <>
      <div class="Qr-scan">
        {/* <QrReader
      scanDelay={200}
        constraints={
          {facingMode: "environment"}
        }
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      /> */}
        {/* <p style={{ color: "red" }}>{data}</p> */}
        <div>
          <video autoPlay muted>
            <source src={URL.createObjectURL(new Blob(navigator.mediaDevices.getUserMedia({ video: true }).stream))} />
          </video>
          <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setData(result?.text);
                }
      
                if (!!error) {
                  console.info(error);
                }
              }}
          />
          <h2>Decoded Data: {data}</h2>
        </div>

        <div class="border-1"></div>
        <div class="border-2"></div>
        <div class="border-3"></div>
        <div class="border-4"></div>
      </div>
    </>
  );
};

export default Test;