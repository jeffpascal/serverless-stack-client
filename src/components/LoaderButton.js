import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "./LoaderButton.css";
import { FaSpinner } from "react-icons/fa";
export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <FaSpinner glyph="refresh" className="spinning" />}
      {props.children}
    </Button>
  );
}
