import React from "react";
import { Button } from "antd";

import "./style.css";

const Btn = ({
  children,
  className,
  color = "primary",
  type = "button",
  ...props
}) => (
  <Button
    className={`${className} Button Button_${color}`}
    type={color}
    {...props}
  >
    {children}
  </Button>
);

export default Btn;
