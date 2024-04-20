const AnimatedPulseIcon = () => (
  <svg
    viewBox="0 0 100 100"
    className="h-6 stroke-current stroke-[7] animate-[pulseDraw_2s_linear_infinite]"
    style={{
      strokeDasharray: 150,
    }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M90 50H73.1l-4.8-15.8L57 89.9 50 50l-7-39.9-11.3 55.7L26.9 50H10"
    ></path>
  </svg>
);

export default AnimatedPulseIcon;
