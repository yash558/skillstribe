import React from 'react'
import logo from '../../assets/logo.png'
import './Footer.css'
const Footer = () => {
    return (
        <div className="footer text-center">
            <div className="footer_img">
                <img src={logo} alt="" />
            </div>
            <div className="footer_details d-flex justify-content-center gap-5 mt-3">
                <div className="details_phone">
                    <i className="uil uil-phone"></i>
                    <span>800-123-7000</span>
                </div>
                <div className="details_email">
                <i className="uil uil-envelope"></i>
                    <span>help@skillstribe.com</span>
                </div>
            </div>

            <div className="details_desc mt-3">
                <span>© 2022 SkillsTribe All Rights Reserved. Privacy Policy</span>
            </div>

        </div>
    )
}

export default Footer