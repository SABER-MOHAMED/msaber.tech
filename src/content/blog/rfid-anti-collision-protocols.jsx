import Image from 'next/image';

export default function RfidAntiCollisionProtocols() {
  return (
    <div>
      <Image
        src="/blog/rfid-anti-collision.png"
        alt="RFID Anti-Collision Protocols"
        width={800}
        height={400}
        style={{
          objectFit: 'cover',
        }}
      />
      <p>Apr 5, 2025 ・🕒 4 min read</p>

      <h2>Analyzing RFID Anti-Collision Protocols</h2>
      <p>
        <strong>Authors:</strong> Ayoub HAMMAD, Mohamed SABER <br />
        <strong>Affiliation:</strong> Ibn Zohr University <br />
        <strong>Emails:</strong> ayoub.hammad.69@edu.uiz.ac.ma,
        mohamed.saber@edu.uiz.ac.ma
      </p>

      <h2>Index Terms</h2>
      <ul>
        <li>RFID: Radio-frequency Identification</li>
        <li>IoT: Internet of Things</li>
        <li>MCMAC: Multi-Channel Medium Access Control</li>
        <li>PULSE Protocol</li>
        <li>OMNeT++</li>
      </ul>

      <h2>Acknowledgement</h2>
      <p>
        This work was done as part of a college assignment. Special thanks to
        Mr. Hassan Ouahi for the opportunity and guidance which helped shape our
        understanding of RFID technology.
      </p>

      <h2>Introduction</h2>
      <p>
        This is a review of the paper “Modeling and Performance Simulation of
        PULSE and MCMAC Protocols in RFID-based IoT Network Using OMNeT++”. It
        compares two distributed anti-collision protocols: PULSE and MCMAC. The
        aim is to analyze their performance in managing reader-reader
        interference using simulation via the OMNeT++ framework.
      </p>

      <h2>The PULSE Protocol</h2>
      <p>
        PULSE is based on CSMA and reduces interference by sending control
        frames on a different frequency. Readers that receive these frames back
        off for a certain time, reducing collisions.
      </p>

      <h2>The MCMAC Protocol</h2>
      <p>
        MCMAC uses FDMA, LBT, and CSMA to allow parallel transmissions on
        distinct channels. It involves subscribing to a control channel and
        performing a backoff routine if the channel is free.
      </p>

      <h2>Results</h2>
      <h3>Scenario 1: Increasing Readers (Fixed Tags)</h3>
      <ul>
        <li>MCMAC shows better throughput and faster tag reading.</li>
        <li>PULSE performs better only with 9+ readers.</li>
        <li>PULSE improves spectrum utilization but has higher delays.</li>
      </ul>

      <h3>Scenario 2: Increasing Tags (Fixed Readers)</h3>
      <ul>
        <li>Both protocols scale linearly with more tags.</li>
        <li>MCMAC consistently reads tags faster.</li>
        <li>Proves MCMAC’s strength in high-density environments.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>
        MCMAC is more efficient for reducing delays, while PULSE offers better
        long-term spectrum efficiency. This work provides benchmarks for future
        RFID-IoT research using OMNeT++.
      </p>

      <h2>References</h2>
      <ul>
        <li>
          O. G. Olaleye et al., “Modeling and performance simulation of PULSE
          and MCMAC protocols in RFID-based IoT network using OMNeT++,” IEEE
          RFID 2018.
        </li>
        <li>EPCglobal Gen2 standards and other related work.</li>
      </ul>
    </div>
  );
}
