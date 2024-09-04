import "./stars.css";

export function AnimatedStars() {
  return (
    <div className="fixed top-0 h-screen w-full -z-10 bg-black">
      <div className="overflow-hidden bg-animation h-screen w-full">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div>
    </div>
  );
}
