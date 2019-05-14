const checkInactiveTimer = ({ waitTime, onActive, onInactive }) => {
  let timeout = 0;
  let active = true;

  const initTimeout = () => {
    timeout = setTimeout(() => {
      onInactive();
      active = false;
    }, waitTime);
  };

  const listenerFn = () => {
    if (!active) {
      active = true;
      onActive();
    }
    clearTimeout(timeout);
    initTimeout();
  };

  const start = () => {
    window.addEventListener('mousemove', listenerFn);
    listenerFn();
  };

  const destroy = () => {
    clearTimeout(timeout);
    window.removeEventListener('mousemove', listenerFn);
  };

  start();
  return () => destroy();
};

export default checkInactiveTimer;