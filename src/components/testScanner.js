import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Test = (props) => {
  const [data, setData] = useState('No result');

  return (
    <>
    <div class="Qr-scan">
    <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      <p style={{color:"red"}}>{data}</p>

      <div class="border-1"></div>
        <div class="border-2"></div>
        <div class="border-3"></div>
        <div class="border-4"></div>
    </div>
    </>
  );
};

export default Test;