import { useState, useEffect } from "react";

export function CountdownTimer({ redirectUrl }) {
    const [secondsRemaining, setSecondsRemaining] = useState(10);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setSecondsRemaining((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(timer);
            window.location.href = redirectUrl;
            return 0;
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, [redirectUrl]);
  
    return (
      <div>
        Перенаправление через {secondsRemaining} секунд...
      </div>
    );
  }
  
  export default CountdownTimer;