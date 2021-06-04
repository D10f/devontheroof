/**
* Run a function no more than once within the given time frame.
* @param  {function}  fn    the original function that will be called
* @param  {number}    freq  miliseconds that define the maximum time frame.
* @return {function}        the version of the function that will be called
*/
export const throttle = (fn, freq) => {
  let throttleUp = true;

  return () => {
    if (!throttleUp) return;

    fn();
    throttleUp = false;
    setTimeout(() => throttleUp = true, freq)
  };
};

/**
* Prevents a function from running more than once if called within a timeframe
* @param  {function}  fn    the original function that will be called
* @param  {number}    time  miliseconds that define the maximum time frame.
* @return {function}        the version of the function that will be called
*/
export const debounce = (fn, time) => {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, time);
  };
};
