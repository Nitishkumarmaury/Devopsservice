const orbitRings = [
  { className: "mission-orbit__ring mission-orbit__ring--wide" },
  { className: "mission-orbit__ring mission-orbit__ring--tilt" },
  { className: "mission-orbit__ring mission-orbit__ring--narrow" },
] as const;

const orbitNodes = [
  "mission-orbit__node mission-orbit__node--one",
  "mission-orbit__node mission-orbit__node--two",
  "mission-orbit__node mission-orbit__node--three",
] as const;

export function OrbitField() {
  return (
    <div className="mission-orbit" aria-hidden="true">
      <div className="mission-orbit__center" />
      {orbitRings.map((ring) => (
        <span key={ring.className} className={ring.className} />
      ))}
      {orbitNodes.map((node) => (
        <span key={node} className={node} />
      ))}
    </div>
  );
}
