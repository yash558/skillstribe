import React, { useState } from 'react'
import './Feature.css'
import whatimg from '../../assets/what.png'
import whyimg from '../../assets/Why.png'
import Howimg from '../../assets/How.png'
const Feature = () => {
    const [title, setTitle] = useState('What is Skillstribe?');
    const [desc, setDesc] = useState("Skillstribe is a decentralized freelancer marketplace built off the Alacrity blockchain. It connects talent with work through an open ended marketplace.");
    const [image, setImage] = useState(whatimg);
   const[ showtab, setShowtab] = useState(0);
    const what = () => {
        setTitle("What is Skillstribe?");
        setDesc("Skillstribe is a decentralized freelancer marketplace built off the Alacrity blockchain. It connects talent with work through an open ended marketplace.");
        setImage(whatimg);
        setShowtab(0);
    }
    const why = () => {
        setTitle("Why do we use it?");
        setDesc("Skillstribe is the best work platform to use because you keep more of your earnings and pay less in fees (whether you are talent or hiring),you can settle payments with finality viaon-chain transactions, and you have direct access to the marketplace without any intermediaries");
        setImage(whyimg);
        setShowtab(1);
    }
    const how = () => {
        setTitle("How Does it Work?");
        setDesc("Skillstribe is a series of deployed smart contraction the Alacrity blockchain. All key data is stored in GAIA Storage, which is a decentralised storage solution. Transactions and payments all occur via on-chain escrow contracts.There is no centralised fund custodian which needs to be trusted.");
        setImage(Howimg);
        setShowtab(2);
    }
    return (
        <div className="feature">
            <div className="feature_title justify-content-centeralign-content-center text-center">
                <h1>The Future is Decentralized, <br />
                    So is Your Work</h1>
                <p>With Skillstribe you can directly connect with a broad network of talent and  <br /> companies. All payments are settled directly
                    <br /> via on-chain transactions and without centralised payment processors and <br /> platforms taking a large cut of your earning!</p>
            </div>

            <div className="feature_details  align-items-center">
                <div className="feature_btn">
                    <button className={showtab === 0 ? "btn-link active ": " btn-link" } onClick={what}>What</button>
                    <button className={showtab === 1 ? "btn-link active ": " btn-link" } onClick={why}>Why</button>
                    <button className={showtab === 2 ? "btn-link active ": " btn-link" } onClick={how}>How</button>
                </div>
                <div className="feature_info">
                    <div className="info_left">
                        <h1>{title}</h1>
                        <p>{desc}</p>
                    </div>
                    <div className="info-right">
                        <img src={image} alt="" />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Feature