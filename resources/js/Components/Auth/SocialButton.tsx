// Facebookログイン用ボタンコンポーネント
import React from "react";
import "./SocialButton.css";

type SocialButtonProps = {
  href?: string;
  onClick?: () => void;
  label?: string;
};

const SocialButton = ({ href = "/auth/facebook/login", onClick, label = "Facebookでログイン" }: SocialButtonProps) => (
  <a href={href} onClick={onClick} className="social-button">
    <img src="/img/facebook-login-button.png" alt="Facebookログイン" className="social-button__icon" />
    {label}
  </a>
);

export default SocialButton;
